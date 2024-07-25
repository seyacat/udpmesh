//execute command
const {execSync, spawn} = require("child_process");

const child = spawn( "npx", ["nodemon" ,"index.js"], {stdio: [process.stdin, process.stdout, process.stderr]} );

setInterval(() => {
  Buffer.from(execSync("git fetch")).toString();
  const ret = Buffer.from(execSync("git status")).toString();
  //console.log(ret);
  if (
    ret.includes("Your branch is behind") ||
    ret.includes("Tu rama está detrás de")
  ) {
    console.log(Buffer.from(execSync("git pull")).toString());
  }
}, 10000);
