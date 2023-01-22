
import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const DashBoardContext = React.createContext();

const { ethereum } = window;

const getDashBoardContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const DashBoardContract = new ethers.Contract(contractAddress, contractABI, signer);

    return DashBoardContract;

    // console.log({
    //     provider,
    //     signer,
    //     DashBoardContract
    // });
}

export const DashBoard_Provider = ({ children })=>{

    const [ currentAccount, setCurrentAccount ] = useState('');
    const [formData, setFormData] = useState({addressTo:'', moneyOut:'', staffName:'', moneyOutDescription:''});
    const [formData1, setFormData1] = useState({addressTo:'', moneyOut:'', moneyOutDescription:''});
    const [formData2, setFormData2] = useState({  moneyIn:'', moneyInDescription:''});
    const [isLoading, setIsLoading] = useState(false);
    const [ transactions, setTransactions ] = useState([]);
    const [spentMonthly, setSpentMonthly] = useState(0);
    const [Expenses, setExpenses] = useState([]);
    const [ExpensesAmount, setExpensesAmount] = useState(0);
    const [record, setRecord] = useState(0);
    const [chartRecord, setChartRecord] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [message, setMessage] = useState('');
    const [account, setAccount] = useState('');
    const [ _alert, set_Alert] = useState('');
    const [ staff_alert, set_staff_Alert] = useState('');
    const [ expenses_alert, set_expense_Alert] = useState('');
    const [ record_alert, set_record_Alert] = useState('');
    //var sum = 0;
  
    const handleChange = (e, name) => {
        setFormData((prevState)=>({...prevState, [name]: e.target.value}));
        setFormData1((prevState)=>({...prevState, [name]: e.target.value}));
        setFormData2((prevState)=>({...prevState, [name]: e.target.value}));
    }



    const adminAddress = event => {
        setMessage(event.target.value);
    }

    const onSearchChange = event => {
        //console.log(event.target.value);
        setSearchField(event.target.value);
    }

    const signAppOut = async () =>{
        window.localStorage.removeItem('account');
        set_Alert("");
    }
        

    const Alert = async () =>{
        set_Alert("Admin not recognised!");
    }


    const recordSet = async () =>{
        
        const {  moneyIn, moneyInDescription } = formData2;

        const store = JSON.parse( localStorage.getItem("recorded"));
        store.push(formData2);
        localStorage.setItem("recorded", JSON.stringify(store));
        window.location.reload();
    }

    useEffect(()=>{
        if(localStorage.getItem("recorded")!=null){
            return;
        }else{
            return localStorage.setItem("recorded", '[]');
        }
        
    }, []);
  
    const getRecordSet = async () =>{
        try{
            const records = JSON.parse( localStorage.getItem("recorded"));
            setChartRecord(records);

            var recordAccum = 0;
          
            for(let i=0; i < records.length; i++){
                recordAccum = recordAccum + parseFloat(records[i].moneyIn) ;    
            }

            const sumera = recordAccum.toFixed(4);
    
            setRecord(sumera);
            


        } catch (error) {
            console.log(error);
        }
    } 



    const getPayStaffTransactions = async () =>{
        try {
            if(!ethereum) return alert('Please install metamask');
            const DashBoardContract = getDashBoardContract();

            const DashBoardTransactions = await DashBoardContract.getPayStaffTransactions();

            const organisedTransactions = DashBoardTransactions.map((transaction)=>({
              addressFrom: transaction.sender,  
              addressTo: transaction.receiver,
              timestamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
              staffName: transaction.staffName,
              moneyOutDescription: transaction.moneyOutDescription,
              moneyOut: parseInt(transaction.moneyOut._hex)/(10**18) 
            }));

            var sum = 0;
          
            for(let i=0; i < organisedTransactions.length; i++){
                sum = sum + organisedTransactions[i].moneyOut;    
            }

            const sumer = sum.toFixed(4);
            // console.log(sumer);
            setSpentMonthly(sumer);
            setTransactions(organisedTransactions);
            //console.log(spentMonthly);
            
        } catch (error) {
            console.log(error);
        }
    }



    const  getExpensesTransactions = async () =>{
        try {
            if(!ethereum) return alert('Please install metamask');
            const DashBoardContract = getDashBoardContract();

            const DashBoardTransactions = await DashBoardContract.getExpensesTransactions();

            const organisedTransactions = DashBoardTransactions.map((transaction)=>({
              addressFrom: transaction.sender,  
              addressTo: transaction.receiver,
              timestamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
              staffName: transaction.staffName,
              moneyOutDescription: transaction.moneyOutDescription,
              moneyOut: parseInt(transaction.moneyOut._hex)/(10**18) 
            }));


            var ExpensesSum = 0;
          
            for(let i=0; i < organisedTransactions.length; i++){
                ExpensesSum =  ExpensesSum  + organisedTransactions[i].moneyOut;    
            }

            setExpensesAmount(ExpensesSum.toFixed(4));

            setExpenses(organisedTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try {
            
            if(!ethereum) return alert('Please install metamask'); // this checks if metamask is installed;

            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if (accounts.length){
                setCurrentAccount(accounts[0]);
       
                getPayStaffTransactions();
                getRecordSet();
                getExpensesTransactions();
                

            } else {
                console.log('No accounts found');
            }  
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object.')
        }

    }


    const connectWallet = async () => {
       
        try{
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
            window.location.reload();
           
        } catch (error){ 
            console.log(error); 

            throw new Error('No ethereum object.');
        }
    }


    const sendStaffTransaction = async () =>{

        try {
            if(!ethereum) return alert('Please install metamask');

            const { addressTo, moneyOut, staffName, moneyOutDescription } = formData;

            if(Math.sign(moneyOut) == -1 || Math.sign(moneyOut) == -0) return(
                set_staff_Alert("Invalid input!")
            );
            
            const DashBoardContract = getDashBoardContract();// gets all the function in the contract;

            const parsedAmount = ethers.utils.parseEther( moneyOut);// changes the amount to hexadecimal number;

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex, // 0.00001
                }]
            });

            const DashBoardtransactionHash = await DashBoardContract.staff_Payments(addressTo, parsedAmount,staffName,moneyOutDescription);

            await DashBoardtransactionHash.wait();
           
            window.location.reload();
                       
        }   catch (error) {
            console.log(error);

            throw new Error('No ethereum object.'); 
            
        }

    }

    const sendExpensesTransaction = async () =>{
       
        try {
            if(!ethereum) return alert('Please install metamask');


            const { addressTo, moneyOut, moneyOutDescription } = formData1;

            if(Math.sign(moneyOut) == -1 || Math.sign(moneyOut) == -0) return(
                set_expense_Alert("Invalid input!")
            );
            
            const DashBoardContract = getDashBoardContract();// gets us all the function in our contract;

            const parsedAmount = ethers.utils.parseEther( moneyOut);// changes the amount to hexadecimal number;

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI standard for EVM
                    value: parsedAmount._hex, // 0.00001
                }]
            });

            // To store transaction on the blockchain;
            const DashBoardtransactionHash = await DashBoardContract.expenses_Transactions(addressTo, parsedAmount,moneyOutDescription);

            await DashBoardtransactionHash.wait();
         
            window.location.reload(true);

                       
        }   catch (error) {
            console.log(error);

            throw new Error('No ethereum object.'); 
            
        }

    }



    useEffect(()=>{
       checkIfWalletIsConnected();
       if(account == true) return setAccount(true);

    }, []);

    return (
        <DashBoardContext.Provider value={{ 
            connectWallet,
            record_alert, 
            staff_alert, 
            expenses_alert, 
            Alert, 
            _alert, 
            currentAccount, 
            account, 
            onSearchChange, 
            signAppOut, 
            message,
            adminAddress, 
            searchField, 
            formData,
            formData1,
            formData2, 
            setFormData,
            setFormData1, 
            recordSet, 
            handleChange, 
            sendStaffTransaction,
            sendExpensesTransaction, 
            transactions,
            spentMonthly,
            record,
            ExpensesAmount,
            chartRecord, 
            isLoading
        }}>
            {children}
        </DashBoardContext.Provider>
    );
}
