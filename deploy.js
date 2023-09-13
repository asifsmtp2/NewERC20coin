const fs = require('fs-extra');
const Web3 = require('web3'); // Importing web3.js library


// read in the contracts

async function createContract(host, contractAbi, contractBytecode, fromAddress, privateKey) {
  
  const web3 = new Web3(host);
  console.log("from address " + fromAddress);


  const abi = JSON.parse(contractAbi)
  
  const txnCount = await web3.eth.getTransactionCount(fromAddress);
  console.log("the txn count " +txnCount)
  
  const txn = {
    chainId: 10202,
    nonce:  web3.utils.numberToHex(txnCount), 
    from: fromAddress,
    to: null,            //public tx "0x0DE0B6B3A7640000 = 10000000000000"
    value: "0x00",
    data: '0x'+contractBytecode,
    gasPrice : "0x00",
    gasLimit: '0x038D7EA4C68000', //1000000000000000 == 0.001
  };
  console.log("create and sign the txn")


  const signedTx = await web3.eth.accounts.signTransaction(txn, privateKey);
  console.log("sending the txn")
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("tx transactionHash: " + txReceipt.transactionHash);
  
  console.log("tx contractAddress: " + txReceipt.contractAddress);
  return txReceipt;
};

async function printNodeInfo(host, fromAddress) {
  
  const web3 = new Web3(host);
  console.log('fromAddress '+fromAddress);

  const txnCount1 = await web3.eth.getTransactionCount(fromAddress) ;
  console.log('curren TransactionCount' + txnCount1)
  
  console.log("node balance " + await web3.eth.getBalance(fromAddress))

};

// ends

async function main(){
///
const host = "<>";//http://######.com:15021";
const from_address = "<>"; 
const privateKey = "<>"; 

const contractAbi = fs.readFileSync('/home//build/##.abi')
const contractByteCode = fs.readFileSync('/home//build/##.bin')

printNodeInfo(host, from_address)
createContract(host, contractAbi, contractByteCode, from_address,privateKey)


}

if (require.main === module) {
  main();
}

module.exports = exports = main
