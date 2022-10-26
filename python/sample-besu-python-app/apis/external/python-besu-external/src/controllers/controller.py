from flask import jsonify, request
import http.client
import json

from src.models.model import *


def trx(method, url, data):
    conn = http.client.HTTPConnection(apiInternalHost, apiInternalPort, timeout=10)
    conn.request(method=method, url=url, body=data, headers=headers)
    response = conn.getresponse()
    print("Status: {} and reason: {}".format(response.status, response.reason))
    conn.close()
    data = response.read()
    return data

def root():
    return jsonify({'message': 'AUNA - Sample External API'}), 200

def allowance():
    response = trx("GET", "/api/allowance", request.data)
    return response

def balanceOf():
    response = trx("GET", "/api/balanceOf", request.data)
    return response

def totalSupply():
    response = trx("GET", "/api/totalSupply", request.data)
    return response

def echo():
    record = json.loads(request.data)
    return record["message"], 200

def ping():
    response = trx("POST", "/ping", request.data)
    return response

def approve():
    response = trx("POST", "/api/approve", request.data)
    return response

def transfer():
    response = trx("POST", "/api/transfer", request.data)
    return response

def transferFrom():
    response = trx("POST", "/api/transferFrom", request.data)
    return response