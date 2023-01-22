//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DashBoardTransactions {
 
    event TransferStaff(address from, address receiver, uint256 moneyOut, string staffName, string moneyOutDescription, uint256 timestamp);
    event TransferExpenses(address from, address receiver, uint256 moneyOut, string moneyOutDescription, uint256 timestamp);
    event TransferRecords(uint256 moneyIn, string moneyInDescription, uint256 timestamp);


    struct Staff{
        address sender;
        address receiver;
        uint256 moneyOut;
        string staffName;
        uint256 timestamp;
        string moneyOutDescription;
    }
    struct Expenses{
        address sender;
        address receiver;
        uint256 moneyOut;
        uint256 timestamp;
        string moneyOutDescription;
    }
    struct Record{
        uint256 moneyIn;
        string moneyInDescription;
        uint256 timestamp;
    }


    Staff[] staff_transactions;
    Expenses[] expenses_transactions;
    Record[] records;
 
/****************************STAFF PAYMENTS*********************************/
    function staff_Payments(address payable receiver, uint256 moneyOut, string memory staffName,string memory moneyOutDescription) public {
     
        staff_transactions.push(Staff(msg.sender, receiver, moneyOut, staffName, block.timestamp, moneyOutDescription));
   
        emit TransferStaff(msg.sender, receiver, moneyOut, staffName, moneyOutDescription, block.timestamp);
    }

    function getPayStaffTransactions() public view returns(Staff[] memory) {
       // return and array of transactions; 
       return staff_transactions;
    }

/*************************EXPENSES TRANSACTIONS*******************************/
    function expenses_Transactions(address payable receiver, uint256 moneyOut, string memory moneyOutDescription) public {

        expenses_transactions.push(Expenses(msg.sender, receiver, moneyOut, block.timestamp, moneyOutDescription));
   
        emit TransferExpenses(msg.sender, receiver, moneyOut, moneyOutDescription, block.timestamp);
    }

    function getExpensesTransactions() public view returns(Expenses[] memory) {
       // return an array of transactions; 
       return expenses_transactions;
    }

/***************************************Record*****************************************/
    function record_transactions(uint256 moneyIn, string memory moneyInDescription) public {

        records.push(Record(moneyIn, moneyInDescription, block.timestamp));
   
        emit TransferRecords( moneyIn, moneyInDescription, block.timestamp);
    }

    function getRecords() public view returns(Record[] memory) {
       // return and array of transactions; 
       return records;
    }


}
