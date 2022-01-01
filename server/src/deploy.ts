import web3 from './web3';
import contract from './compile';

async function deploy(deployer: string) {
  const bank = await new web3.eth.Contract(JSON.parse(contract.interface))
    .deploy({
      data: contract.bytecode,
    })
    .send({ from: deployer, gas: 1000000 });
  console.log(bank.options.address);
  return bank;
}

export default deploy;
