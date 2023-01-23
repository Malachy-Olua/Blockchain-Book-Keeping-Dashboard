# Blockchain-Book-Keeping-Dashboard

## Project Description
Blockchain-Book-Keeping-Dashboard is a blockchain web application that helps an organisation(small and medium scale) to keep track of their spendings either paying of salary to employees or any other expenses.

It promotes paying of salary in cryptocurrency as oppossed the normal fiat currency salary payments.

Each salary payment is mapped to the employee with the date and time the payment was made.

The app is customised for the company or organisation alone. It is made in such a way that its only the company or organisation's manager or whoever is responsible for making payments and keeping the records will have access to the web app.

The `Pay Staff` and `Expenses` when used, sends ether to the receiver, stores the data on the blockchain and maps each employee or expenditure to the amount paid, date the payment was made and time of payment. 

while `Record` when used, stores the information of cash inflow into the organization in the local storage. Local storage was choosen just to minimize much spending on gas fees due to recording transactions.

## Technologies used
- React
- CSS
- Hardhat
- Metamask
- Goerli Testnet
- Solidity
- Alchemy

## Landing Page
![Screenshot (20)](https://user-images.githubusercontent.com/105208823/214034880-209b4680-ca24-4ea4-a93e-461337b5c045.png)

## Dashboard
![Screenshot (22)](https://user-images.githubusercontent.com/105208823/214035755-e250c330-6daf-4238-8c95-6ef0e3f3c843.png)

## Website Link
https://dashboard-grandida.netlify.app/

After connecting metamask, use the details below to login
- `adminAddress`:0x514D86d065b0478cE65e1944223328a549b3fbDD
- To see data displayed on the **Information for Cash-In** and **Cash Inflow Chart** box, use the `Record` to make some transactions.

## How to Intall and Run the Project
- First install Node JS from https://nodejs.org
- Install metamask and add it as an extension in your browser
- Run `npm install` to install all the modules listed in the dependencies
- Run `npm start` to start the project locally
- Open http://localhost:3000 with your browser to see the result.

