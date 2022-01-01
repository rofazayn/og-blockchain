import fs from 'fs';
import path from 'path';
import * as solc from 'solc';

const contractPath = path.resolve(__dirname, '../../contracts', 'Bank.sol');
const contractSource = fs.readFileSync(contractPath, { encoding: 'utf8' });

const compiled = solc.compile(contractSource, 1);

// console.log(contractPath);
// console.log(contractSource);
// console.log(compiled);

export default compiled.contracts[':Bank'];
