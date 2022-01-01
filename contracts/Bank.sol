pragma solidity ^0.4.17;

contract Bank {
    int256 private balance;

    constructor() public {
        balance = 1;
    }

    function getBalance() public view returns (int256) {
        return balance;
    }

    function debit(int256 amount) public {
        balance = balance - amount;
    }

    function credit(int256 amount) public {
        balance = balance + amount;
    }
}
