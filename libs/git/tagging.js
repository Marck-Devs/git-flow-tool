const runCMD = require("../runner");

/**
 * Create new tag
 * @param {String} repo 
 * @param {string} tag 
 * @param {string} ref 
 * @returns {Promise<string>} the command result
 */
function create(repo, tag, ref = ""){
  const CMD = `git -C ${repo} tag ${tag} ${ref}`;
  return runCMD(CMD);
}


module.exports = {
  create
}