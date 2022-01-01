import web3 from './web3';
import deploy from './deploy';

const main = async () => {
  const accounts = await web3.eth.getAccounts();
  const bank = await deploy(accounts[0]);

  return bank;
};

main();
