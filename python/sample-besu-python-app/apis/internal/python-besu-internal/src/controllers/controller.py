from flask import jsonify, request
import json
from web3 import Web3

from src.models.model import *


def root():
   return jsonify({'message': 'AUNA - Sample Internal API'}), 200

def allowance():    #(owner, delegate)
    record = json.loads(request.data)
    owner = Web3.toChecksumAddress(record['owner'])
    delegate = Web3.toChecksumAddress(record['delegate'])
    r = contract.functions.allowance(owner, delegate).call()
    return jsonify({'allowance': r}), 200

def balanceOf():    #(tokenOwner)
    record = json.loads(request.data)
    tokenOwner = Web3.toChecksumAddress(record['tokenOwner'])
    r = contract.functions.balanceOf(tokenOwner).call()
    return jsonify({'balanceOf': r}), 200

def totalSupply():
    r = contract.functions.totalSupply().call()
    return jsonify({'totalSupply': r}), 200

def echo():
    record = json.loads(request.data)
    return record["message"], 200

def ping():
    return 'pong', 200

def approve():      #(delegate, numTokens)
    record = json.loads(request.data)
    delegate = Web3.toChecksumAddress(record['delegate'])
    numTokens = int(record['numTokens'])
    nonce = w3.eth.get_transaction_count(network_account)
    transfer_txn = contract.functions.transfer(
        delegate,
        numTokens).buildTransaction({
        'chainId': w3.eth.chain_id,
        'gas': gas,
        'gasPrice': w3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.sign_transaction(transfer_txn, private_key = bytearray.fromhex(network_account_privateKey.replace("0x", "")))
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return jsonify({'hash': str(tx_hash)}), 200

def transfer():     #(receiver, numTokens)
    record = json.loads(request.data)
    receiver = Web3.toChecksumAddress(record['receiver'])
    numTokens = int(record['numTokens'])
    nonce = w3.eth.get_transaction_count(network_account)
    transfer_txn = contract.functions.transfer(
        receiver,
        numTokens).buildTransaction({
        'chainId': w3.eth.chain_id,
        'gas': gas,
        'gasPrice': w3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.sign_transaction(transfer_txn, private_key = bytearray.fromhex(network_account_privateKey.replace("0x", "")))
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return jsonify({'hash': str(tx_hash)}), 200

def transferFrom(): #(owner, buyer, numTokens)
    record = json.loads(request.data)
    owner = Web3.toChecksumAddress(record['owner'])
    buyer = Web3.toChecksumAddress(record['buyer'])
    numTokens = int(record['numTokens'])
    nonce = w3.eth.get_transaction_count(network_account)
    transfer_txn = contract.functions.transferFrom(
        owner,
        buyer,
        numTokens).buildTransaction({
        'chainId': w3.eth.chain_id,
        'gas': gas,
        'gasPrice': w3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.sign_transaction(transfer_txn, private_key = bytearray.fromhex(network_account_privateKey.replace("0x", "")))
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return jsonify({'hash': str(tx_hash)}), 200   