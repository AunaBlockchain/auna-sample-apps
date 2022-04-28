import * as init from '../init';


export async function putToContract(method: string, param1: string, param2: string, param3: string) {
    console.log("putToContract> START");
    
    const web3 = init.web3
    const contractAbi        = init.vars.contractAbi;
    const contractAccount    = init.vars.account_from.publicKey;
    const contractPrivateKey = init.vars.account_from.privateKey;
    const contractAddress    = init.vars.contractAddress;

    console.log("putToContract> web3.version      : ", web3.version);
    //console.log("putToContract> contractAbi       : ", contractAbi);
    console.log("putToContract> contractAccount   : ", contractAccount);
    console.log("putToContract> contractprivateKey: ", contractPrivateKey);
    console.log("putToContract> contractAddress   : ", contractAddress);

    // Contract Tx
    const contract = new web3.eth.Contract(contractAbi);

    var encoded = "";

    console.log(`putToContract> Calling '${method}' ('${param1}', '${param2}', '${param3}') function in contract at address '${contractAddress}'`);

    if (method === "transfer") {
        let _receiver = param1;
        let _numTokens = param2;
        encoded = contract.methods.transfer(_receiver, _numTokens).encodeABI();

    } else if (method === "approve") {
        let _delegate = param1;
        let _numTokens = param2;
        encoded = contract.methods.approve(_delegate, _numTokens).encodeABI();

    } else if (method === "transferFrom") {
        let _owner = param1;
        let _buyer = param2;
        let _numTokens = param3;
        encoded = contract.methods.transferFrom(_owner, _buyer, _numTokens).encodeABI();
    }
    
    const transaction = async () => {
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
    
            const createReceipt = await web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            );
            console.log(`putToContract> Tx successfull with hash: '${createReceipt.transactionHash}'`);
            return createReceipt.transactionHash;
        } catch (err) {
            console.error("putToContract> ERROR:\n", err);
            console.log("putToContract> returning NULL");
            return null;
        }
    };
    return transaction();  
}

export async function getFromContract(method: string, param1: string, param2: string) {
    console.log("getFromContract> START");

    const web3 = init.web3
    const contractAbi        = init.vars.contractAbi;
    const contractAccount    = init.vars.account_from.publicKey;
    const contractAddress    = init.vars.contractAddress;

    console.log("getFromContract> method         : ", method);
    console.log("getFromContract> param1         : ", param1);
    console.log("getFromContract> param2         : ", param2);
    console.log("getFromContract> web3.version   : ", web3.version);
    //console.log("getFromContract> contractAbi    : ", contractAbi);
    console.log("getFromContract> contractAccount: ", contractAccount);
    console.log("getFromContract> contractAddress: ", contractAddress);

    // Contract Call
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    const get = async () => {
        var data = null;
        console.log(`getFromContract> Making a call to contract at address '${contractAddress}'`);

        try {
            if (method === "totalSupply") {
                data = await contract.methods
                    .totalSupply()
                    .call({ from: contractAccount }
                );
            } else if (method === "balanceOf") {
                let _tokenOwner = param1;
                data = await contract.methods
                    .balanceOf(_tokenOwner)
                    .call({ from: contractAccount }
                );
            } else if (method === "allowance") {
                let _owner = param1;
                let _delegate = param2;
                data = await contract.methods
                    .allowance(_owner, _delegate)
                    .call({ from: contractAccount }
                );
            }
            console.log(`getFromContract> The current '${method}' stored is: '${data}'`);
            return data;
        } catch (err) {
            console.error("getFromContract> ERROR:\n", err);
            console.log("getFromContract> returning NULL");
            return null;
        }
    };
    return get();
}