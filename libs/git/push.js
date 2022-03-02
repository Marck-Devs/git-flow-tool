const runCMD = require("../runner");

function push(repo, remote, branch = "", options = false){
  let opts = "";
  if(options && options instanceof Array){
    opts = options.join(" ");
  }
  const CMD = `git -C ${repo} push ${opts} ${remote} ${branch}`;
  return runCMD(CMD);
}

module.exports = {
  push
}