import { spawn } from 'node:child_process';

// get command line arguments one and two: one is the day, two is the part as integers
const day = process.argv[2];
const part = process.argv[3];

const ls = spawn(`ts-node`, [`src/day${day}/day${day}_part${part}.ts`, day, part], {shell: true});

ls.stdout.on('data', (data) => {
  console.log(`${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`${data}`);
});