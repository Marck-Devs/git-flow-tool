const { SimpleLogger } = require("mk-simple-logger");
const { Runner, Error } = require("..");

/**
 * 
 * @param {string} repo repo path
 * @param {string} ref reference to checkout
 * @returns {boolean} if checked out
 */
async function checkout(repo, ref){
  const LOG = new SimpleLogger("Checkout");
  let command = `git -C ${repo} checkout ${ref}`;
  try{
    LOG.info("Running command");
    LOG.debug(command);
    await Runner(command);
    return true;
  }catch(error){
    Error.logError(LOG, error);
    return false;
  }
}

module.exports = {
  checkout
}