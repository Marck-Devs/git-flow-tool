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

/**
 * Delete a tag
 * @param {string} repo the repo path
 * @param {string} tag the tag name
 * @returns {Promise<string>} The command result
 */
 function del(repo, tag){
  const CMD = `git -C ${repo} tag -D ${tag}`;
  return runCMD(CMD)
}

module.exports = {
  create,
  delete: del
}