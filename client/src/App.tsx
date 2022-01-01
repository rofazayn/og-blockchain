import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [bankABI, setBankABI] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState(0);

  async function deployContract() {
    const response = await axios.get('http://localhost:4000/deploy');
    if (response.data) {
      setBankABI(response.data.jsonInterface);
      setAddress(response.data.address);
      console.log(response.data);
    }
  }

  function handleDeployment(e) {
    e.preventDefault();
    deployContract();
  }

  async function deposit() {
    const attempt = await axios.post('http://localhost:4000/deposit', {
      address: address,
      jsonInterface: bankABI,
      amount: amount,
    });

    if (attempt.data) {
      getBalance();
    }
  }

  async function credit() {
    const attempt = await axios.post('http://localhost:4000/credit', {
      address: address,
      jsonInterface: bankABI,
      amount: amount,
    });

    if (attempt.data) {
      getBalance();
    }
  }

  async function getBalance() {
    const response = await axios.post('http://localhost:4000/balance', {
      address: address,
      jsonInterface: bankABI,
    });

    if (response.data) {
      setBalance(response.data);
    }
  }

  return (
    <div className='App'>
      <h1>OG - Blockchain</h1>
      {!address ? (
        <>
          <h2>Deploy a contract to start</h2>
          <button onClick={handleDeployment}>Deploy Bank Contract</button>
        </>
      ) : (
        <>
          <h2>Contract address: {address}</h2>
          {/* <h2>Contract interface: {bankABI}</h2> */}
          <button onClick={() => getBalance()}>Get balance</button>
          <hr />
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
          <button onClick={() => deposit()}>Deposit</button>
          <button onClick={() => credit()}>Credit</button>
        </>
      )}
      {balance && <h1>Account balance: {balance}</h1>}
    </div>
  );
}

export default App;
