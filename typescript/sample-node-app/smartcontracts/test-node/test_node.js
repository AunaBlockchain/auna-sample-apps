'use strict';

const shim = require('fabric-shim');

const logger = shim.newLogger('TEST_CC');
logger.level = 'debug';

const TestChaincode = class {

	constructor() {
		// Force context binding for functions
		this.iterateThroughQuery = this.iterateThroughQuery.bind(this);
		this.queryCustomers = this.queryCustomers.bind(this);
	}

	// The Init method is called when the Smart Contract is instantiated by the blockchain network
	// Best practice is to have any Ledger initialization in separate function -- see initLedger()
	async Init(stub) {
		logger.info('=========== Instantiated bcs-test chaincode ===========');
		return shim.success();
	}

	// The Invoke method is called as a result of an application request to run the Smart Contract.
	// The calling application program has also specified the particular smart contract
	// function to be called, with arguments
	async Invoke(stub) {
		let ret = stub.getFunctionAndParameters();
		logger.info(ret);

		let method = this[ret.fcn];
		if (!method) {
			logger.error('no function of name:' + ret.fcn + ' found');
			throw new Error('Received unknown function ' + ret.fcn + ' invocation');
		}
		try {
			let payload = await method(stub, ret.params);
			logger.debug('Payload is: ', payload);
			if (!payload) {
				payload = Buffer.from(JSON.stringify(ret.params));
			}
			return shim.success(payload);
		} catch (err) {
			logger.error(err);
			return shim.error(err);
		}
	}

	async ping(stub, args) {
		return Buffer.from('pong');
	}

	/**
	 * Creates a new Customer or updates an existing one
	 */
	async createCustomer(stub, args) {
		logger.info('============= START : Create Customer ===========');
		if (!args || !args.length) {
			throw new Error('Incorrect number of arguments. Expecting 1');
		}

		const customer = JSON.parse(args[0]);
		if (!customer)
			throw new Error('Invalid arguments, empty customer');
		if (!customer.rut)
			throw new Error('Invalid arguments, empty rut');
		if (!customer.firstName)
			throw new Error('Invalid arguments, empty firstName');
		if (!customer.firstName)
			throw new Error('Invalid arguments, empty lastName');
		if (!customer.status)
			customer.status = 'UNVERIFIED';
		if (!customer.accountType)
			customer.accountType = 'NORMAL';
		if (!customer.amount) {
			customer.amount = 0;
		} else if (!Number.isInteger(customer.amount)) {
			customer.amount = Number(customer.amount);
		}

		await stub.putState(customer.rut, Buffer.from(JSON.stringify(customer)));
		logger.info('============= END : Create Customer ===========');
	}

	/**
	 * Adds (positive) or substracts (negative) an amout to/from a RUT account
	 */
	async addCustomerFunds(stub, args) {
		logger.info('============= START : Add Customer funds ===========');
		if (!args.length) {
			throw new Error('Incorrect number of arguments. Expecting 1');
		}

		const p = JSON.parse(args[0]);
		if (!p.rut)
			throw new Error('Invalid arguments, empty rut');
		if (!p.amount)
			throw new Error('Invalid arguments, empty or zero amount');

		const customerAsBytes = await stub.getState(p.rut);
		const customer = JSON.parse(customerAsBytes);
		customer.amount += Number(p.amount);

		await stub.putState(p.rut, Buffer.from(JSON.stringify(customer)));
		logger.info('============= END : Add Customer funds ===========');
	}

	/**
	 * Select * from Customers
	 */
	async queryAllCustomers(stub, args) {
		logger.info('============= START : Query all Customers ===========');
		let startKey = '';
		let endKey = '';

		let iterator = await stub.getStateByRange(startKey, endKey);

		let allResults = [];
		while (true) {
			let res = await iterator.next();

			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				logger.debug(res.value.value.toString('utf8'));

				jsonRes.Key = res.value.key;
				try {
					jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
				} catch (err) {
					logger.error(err);
					jsonRes.Record = res.value.value.toString('utf8');
				}
				allResults.push(jsonRes);
			}
			if (res.done) {
				logger.debug('end of data');
				await iterator.close();
				logger.info(allResults);
				return Buffer.from(JSON.stringify(allResults));
			}
		}
	}

	/**
	 * Change history for a RUT account
	 */
	async queryCustomerHistory(stub, args) {
		logger.info('============= START : Query Customer History ===========');
		let rut = args[0];
		let iterator = await stub.getHistoryForKey(rut);
		let allResults = [];

		while (true) {
			let res = await iterator.next();

			logger.debug(res);
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				let timestamp = res.value.timestamp;
				logger.debug('Timestamp (full, seconds, nanos): ', timestamp, timestamp.seconds, timestamp.nanos);

				logger.debug(res.value.value.toString('utf8'));

				jsonRes.Key = res.value.key;
				try {
					jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
				} catch (err) {
					logger.error(err);
					jsonRes.Record = res.value.value.toString('utf8');
				}
				allResults.push(jsonRes);
			}
			if (res.done) {
				logger.debug('end of data');
				await iterator.close();
				logger.info(allResults);
				return Buffer.from(JSON.stringify(allResults));
			}
		}
	}

	/**
	 * Internal function.
	 * Takes in an iterator object and returns a string of all records in the set
	 */
	async iterateThroughQuery(iter) {
		let res = {};
		let outArray = [];
		while (!res.done) {
			res = await iter.next();
			if (res.value && res.value.value)
				outArray.push(res.value.value.toString('utf8'));
		}
		await iter.close();
		if (outArray.length === 0) {
			logger.debug('No record found');
			return Buffer.from('No record found');
		}

		return Buffer.from(JSON.stringify(outArray));
	}

	/**
	 * Executes a CouchDB selector query
	 */
	async queryCustomers(stub, args) {
		logger.info('============= START : Query Customers ===========');
		const jsonSnip = args[0];

		logger.debug('Beginning rich query');
		logger.debug('Search by: ', jsonSnip);

		//create iterator from selector key
		let partialIterator = await stub.getQueryResult(jsonSnip);
		//return all keys
		let out = await this.iterateThroughQuery(partialIterator);

		logger.debug('Rich Query Complete');
		logger.debug(out);
		return out;
	}
}

shim.start(new TestChaincode());