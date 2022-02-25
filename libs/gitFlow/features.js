const {SimpleLogger} = require("mk-simple-logger");
const { logError } = require("../error");
const {BasicBranching, Checkout} = require("../git")

/**
 * Create new feature
 * @param {string} repo the repo path
 * @param {string} name the feature name
 * @returns {Promise<boolean>} if the branch has been created
 */
async function create(repo, name){
  const LOG = new SimpleLogger("CreateFeature");
  if(!repo || repo == ""){
    LOG.error("Invalid name for new feature")
    throw "Invalid feature name";
  }
  LOG.info("Creating new feature: {name}", {name});
  const FEAT_BASE = "feat/";
  return await BasicBranching.createBranch(repo, FEAT_BASE + name);
}

/**
 * Delete a feature
 * @param {string} repo the repo path
 * @param {string} name the feature name
 * @returns {Promise<boolean>} if the branch has been deleted
 */
async function del(repo, name){
  const LOG = new SimpleLogger("DeleteFeature");
  LOG.info("Deleting feature {name}", {name});
  const FEAT_BASE =  "feat/";
  return await BasicBranching.deleteBranch(repo, FEAT_BASE + name)
}

/**
 * Checkout to the feature
 * @param {string} repo the repo path
 * @param {string} name the feature name
 * @returns {Promise<boolean>} if has checked out correctly
 */
async function checkout(repo, name){
  const LOG = new SimpleLogger("CheckOutFeature");
  const FEAT_BASE = "feat/";
  try{
    LOG.info("Running command")
    let out = await Checkout(repo, FEAT_BASE + name);
    LOG.info("Checkout to feature {n}", {n:name});
    return out;
  }catch(error){
    logError(error);
    return false;
  }
}

module.exports = {
  create,
  delete: del,
  checkout
}