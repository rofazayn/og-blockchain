import express from 'express';
import cors from 'cors';
import compiledContract from './compile';
import web3 from './web3';
import deploy from './deploy';
import bodyParser from 'body-parser';

const main = async () => {
  const port = 4000;
  const app = express();

  app.use(bodyParser());
  app.use(cors());

  app.get('/deploy', async (_, res) => {
    const accounts = await web3.eth.getAccounts();
    const jsonInterface = compiledContract.interface;

    const account = accounts[0];

    try {
      const deployAttempt = await deploy(account);
      const address = deployAttempt.options.address;
      res.status(200).json({ jsonInterface, address });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/balance', async (req, res) => {
    const address = req.body.address;
    const jsonInterface = req.body.jsonInterface;
    try {
      const contract = await new web3.eth.Contract(
        JSON.parse(jsonInterface),
        address
      );
      const balance = await contract.methods.getBalance().call();
      if (balance) {
        res.status(200).json(balance);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Can't get balance");
    }
  });

  app.post('/deposit', async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const { address, jsonInterface, amount } = req.body;
    try {
      const contract = await new web3.eth.Contract(
        JSON.parse(jsonInterface),
        address
      );
      const transaction = await contract.methods
        .credit(amount)
        .send({ from: accounts[0] });
      if (transaction) {
        res.status(200).json(transaction);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Can't add funds");
    }
  });

  app.post('/credit', async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const { address, jsonInterface, amount } = req.body;
    try {
      const contract = await new web3.eth.Contract(
        JSON.parse(jsonInterface),
        address
      );
      const transaction = await contract.methods
        .debit(amount)
        .send({ from: accounts[0] });
      if (transaction) {
        res.status(200).json(transaction);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Can't debit funds");
    }
  });

  app.listen(port, () => {
    console.log(`Server up & running on http://localhost:${port}`);
  });
  // const accounts = await web3.eth.getAccounts();
  // const bank = await deploy(accounts[0]);

  // return bank;
};

main();
