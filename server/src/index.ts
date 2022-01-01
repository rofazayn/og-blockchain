import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8301');

const main = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('accounts', accounts);
  const accountBalance = await web3.eth.getBalance(
    '0x8D13B013D5C2b5EA6fa8eac8C352D7b87d22cF0f'
  );
  console.log('balance', accountBalance);
};

main();
