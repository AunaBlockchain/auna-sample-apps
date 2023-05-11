package main

import (
	"bytes"
	"encoding/json"
	"strconv"
	"strings"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

var logger = shim.NewLogger("Test CC Logger")

// TestChaincode structure for defining the shim
type TestChaincode struct {
}

// StockSymbol data store representing a Document
type StockSymbol struct {
	ISIN        string `json:"ISIN"`
	Symbol      string `json:"Symbol"`
	Description string `json:"Description"`
	Price       string `json:"Price"`
}

func main() {
	logger.Info("Test Chaincode Activated")
	err := shim.Start(new(TestChaincode))
	if err != nil {
		logger.Error("Error starting Test chaincode: %s", err)
	}
}

// Init function used to initialize the Closest Snapshot in-memory Index
func (c *TestChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	logger.SetLevel(shim.LogInfo)
	logger.Info("Initializing Test Chaincode")

	return shim.Success(nil)
}

// Invoke accepts all invoke commands from the blockchain and decides which function to call based on the inputs
func (c *TestChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	logger.Debug("V1.0")

	function, args := stub.GetFunctionAndParameters()

	switch function {
	case "init":
		return c.Init(stub)
	case "ping":
		return shim.Success([]byte("pong"))
	case "find":
		return c.find(stub, args[0])
	case "history":
		return c.history(stub, args[0])
	case "store":
		return c.store(stub, args[0])
	}

	logger.Error("Invalid Test Invoke Function: " + function)
	return shim.Error("Invalid Invoke Function: " + function)
}

// ---------------------------- //
// Common Shim usage functions  //
// ---------------------------- //

// query executes a query on the Worldstate DB
func query(stub shim.ChaincodeStubInterface, jsonSnip string) ([]string, error) {
	logger.Debug("Search by: \n" + jsonSnip)

	//create iterator from selector key
	iter, err := stub.GetQueryResult(jsonSnip)
	if err != nil {
		logger.Error(err)
		return nil, err
	}
	defer iter.Close()

	var outArray []string
	for iter.HasNext() {
		data, err := iter.Next()
		if err != nil {
			return nil, err
		}
		outArray = append(outArray, string(data.Value))
	}

	return outArray, nil
}

// convertQueryResultsToJSONByteArray converts an array of JSON Strings to a
// byte array that is also a JSON Array
func convertQueryResultsToJSONByteArray(rows []string) []byte {
	var buffer bytes.Buffer

	buffer.WriteString("[")
	if len(rows) > 0 {
		buffer.WriteString(strings.Join(rows, ","))
	}
	buffer.WriteString("]")

	return buffer.Bytes()
}

// ----------------------------- //
// Chaincode Business functions  //
// ----------------------------- //

// find executes a Selector query against the WorldState and returns the results in JSON format.
func (c *TestChaincode) find(stub shim.ChaincodeStubInterface, jsonSnip string) pb.Response {
	logger.Info("Beginning JSON query")

	results, err := query(stub, jsonSnip)
	if err != nil {
		logger.Error(err)
		return shim.Error("Error executing query")
	}

	outBytes := convertQueryResultsToJSONByteArray(results)
	return shim.Success(outBytes)
}

// history returns the chain of StockSymbol against the WorldState and returns the results in JSON format.
func (c *TestChaincode) history(stub shim.ChaincodeStubInterface, symbolId string) pb.Response {
	logger.Infof("Beginning history call %s", symbolId)

	resultsIterator, err := stub.GetHistoryForKey(symbolId)
	if err != nil {
		logger.Error(err)
		return shim.Error("Error executing history")
	}
	defer resultsIterator.Close()

	// Create a buffer to store the history data in JSON format
	var buffer bytes.Buffer
	buffer.WriteString("[")

	// Set a flag to keep track of whether the first transaction has been added to the buffer
	bArrayMemberAlreadyWritten := false

	// Iterate over each transaction in the iterator
	for resultsIterator.HasNext() {
		// Get the next transaction and associated metadata
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		// Add a comma before each transaction, except for the first one
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}

		// Add the transaction ID to the buffer in JSON format
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		// Add the value of the key for the current transaction to the buffer in JSON format
		buffer.WriteString(", \"Value\":")
		if response.IsDelete {
			// If the key was deleted, set the value to null
			buffer.WriteString("null")
		} else {
			// If the key was not deleted, add the value to the buffer as a string
			buffer.WriteString(string(response.Value))
		}

		// Add the timestamp of the transaction to the buffer in JSON format
		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		// Add a flag to indicate whether the key was deleted or not to the buffer in JSON format
		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")

		// Set the flag to true after the first transaction has been added to the buffer
		bArrayMemberAlreadyWritten = true
	}

	buffer.WriteString("]")

	// Return the history data in the buffer as a response
	return pb.Response{
		Status:  200,
		Payload: buffer.Bytes(),
		Message: "Query executed successfully",
	}
}

// store stores the StockSymbol as either an insert or an update transaction
func (c *TestChaincode) store(stub shim.ChaincodeStubInterface, jsonSnip string) pb.Response {
	incoming := StockSymbol{}
	err := json.Unmarshal([]byte(jsonSnip), &incoming)
	if err != nil {
		logger.Error("Error in store()", err)
		return shim.Error("Error parsing input")
	}

	if len(incoming.ISIN) == 0 || len(incoming.Symbol) == 0 {
		logger.Error("Invalid ISIN or Symbol", err)
		return shim.Error("Invalid ISIN or Symbol")
	}
	if _, err := strconv.ParseInt(incoming.Price, 10, 64); err != nil {
		logger.Error("Invalid Price", err)
		return shim.Error("Invalid Price")
	}

	bytes, err := json.Marshal(incoming)
	if err != nil {
		logger.Info("Error marshalling StockSymbol: " + incoming.Symbol)
		return shim.Error("Error marshalling StockSymbol" + incoming.Symbol)
	}

	err = stub.PutState(incoming.Symbol, bytes)
	if err != nil {
		logger.Info("Error writing StockSymbol: " + incoming.Symbol)
		return shim.Error("Error writing StockSymbol: " + incoming.Symbol)
	}
	logger.Info("Loaded StockSymbol: " + incoming.Symbol)

	return shim.Success(nil)
}
