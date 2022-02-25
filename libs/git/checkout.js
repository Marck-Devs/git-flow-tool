const { SimpleLogger } = require("mk-simple-logger");
const { logError } = require("../error");
const runner = require("../runner");

/**
 * Checkout to the reference
 * @param {string} repo repo path
 * @param {string} ref reference to checkout
 * @returns {Promise<boolean>} if checked out
 */
async function checkout(repo, ref){
  const LOG = new SimpleLogger("Checkout");
  let command = `git -C ${repo} checkout ${ref}`;
  try{
    LOG.info("Running command");
    LOG.debug(command);
    await runner(command);
    return true;
  }catch(error){
    logError(LOG, error);
    return false;
  }
}

module.exports = {
  checkout
}