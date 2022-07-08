// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HelloWorldContract.sol";

contract TestHelloWorldContract {

    // The address of contract to be tested
    HelloWorldContract helloWorldContract = HelloWorldContract(DeployedAddresses.HelloWorldContract());

    string newWord = "Hello";
    string expectedWord = "Hello";

    // Testing the setWord() function
    function testSetWord(string newWord) public {
        string expectedWord = helloWorldContract.setWord(newWord);
        Assert.equal(expectedWord, newWord, "Bug in setWord().");
    }

    // Testing the getWord() function
    function testGetWord() public {
        string returnedWord = helloWorldContract.getWord();
        Assert.equal(returnedWord, expectedWord, "Bug in getWord().");
    }
 }
