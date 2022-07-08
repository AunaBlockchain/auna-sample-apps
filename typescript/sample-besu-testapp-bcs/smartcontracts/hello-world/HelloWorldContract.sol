// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
pragma experimental ABIEncoderV2;

contract HelloWorldContract {
    string private name;
    uint256 private age;

    //set
    function setName(string memory newName) public {
        name = newName;
    }

    //get
    function getName() public view returns (string memory) {
        return name;
    }

    //set
    function setAge(uint256 newAge) public {
        age = newAge;
    }

    //get
    function getAge() public view returns (uint256) {
        return age;
    }
}
