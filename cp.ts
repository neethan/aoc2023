import * as fs from "fs";
const day = process.argv[2];
fs.cpSync("src/day", `src/day${day}`, { recursive: true });
fs.renameSync(`src/day${day}/day_.ts`, `src/day${day}/day${day}.ts`);
