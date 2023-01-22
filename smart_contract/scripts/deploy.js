
const main = async () => {

  const DashBoardTransactions = await hre.ethers.getContractFactory('DashBoardTransactions');
  const dashBoardtransactions = await DashBoardTransactions.deploy();

  await dashBoardtransactions.deployed();

  console.log("Transactions deployed to:", dashBoardtransactions.address);
  
  
}

const runMain = async () =>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();