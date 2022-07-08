import { vars, web3 } from '../init';
import { Contract } from 'web3-eth-contract';

export async function putToContract(method: string, ...params: string[]) {
	console.log("putToContract> START");

	const contractAbi = vars.contractAbi;
	const contractAccount = vars.account_from.publicKey;
	const contractPrivateKey = vars.account_from.privateKey;
	const contractAddress = vars.contractAddress;

	console.log("putToContract> contractAccount   : ", contractAccount);
	console.log("putToContract> contractprivateKey: ", contractPrivateKey);
	console.log("putToContract> contractAddress   : ", contractAddress);

	// Contract Tx
	const contract: Contract = new web3.eth.Contract(contractAbi);

	let cm = contract.methods[method];
	if (!cm) {
		throw new Error('method not found for smartcontract');
	}

	cm = cm.bind(contract);
	console.log(`getFromContract> Making a call to contract at address '${contractAddress}'`);
	const encoded = await cm(...params).encodeABI();

	console.log(`putToContract> Calling '${method}' ('${params}') function in contract at address '${contractAddress}'`);

	try {
		const createTransaction = await web3.eth.accounts.signTransaction(
			{
				from: contractAccount,
				to: contractAddress,
				data: encoded,
				gas: '4700000'
			},
			contractPrivateKey
		);
		console.log("putToContract> createTransaction:\n", createTransaction);
		if (!createTransaction.rawTransaction) {
			console.error('rawTransaction is empty');
			return null;
		}
		const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);

		console.log(`putToContract> Tx successfull with hash: '${createReceipt.transactionHash}'`);
		return createReceipt.transactionHash;
	} catch (err) {
		console.error("putToContract> ERROR:\n", err);
		console.log("putToContract> returning NULL");
		return null;
	}
}

export async function getFromContract(method: string, ...params: string[]) {
	console.log("getFromContract> START");

	const contractAbi = vars.contractAbi;
	const contractAccount = vars.account_from.publicKey;
	const contractAddress = vars.contractAddress;

	console.log("getFromContract> method         : ", method);
	console.log("getFromContract> params         : ", ...params);
	console.log("getFromContract> contractAccount: ", contractAccount);
	console.log("getFromContract> contractAddress: ", contractAddress);

	// Contract Call
	const contract: Contract = new web3.eth.Contract(contractAbi, contractAddress);

	let cm = contract.methods[method];
	if (!cm) {
		throw new Error('method not found for smartcontract');
	}

	cm = cm.bind(contract);
	console.log(`getFromContract> Making a call to contract at address '${contractAddress}'`);
	const data = await cm(...params).call({ from: contractAccount });

	return data;
}