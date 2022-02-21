const {SimpleLogger} = require("mk-simple-logger");
const { Runner } = require("..");
const {BasicBranching} = require("../git")

async function create(repo, name){
  const LOG = new SimpleLogger("CreateFeature");
  if(!repo || repo == ""){
    LOG.error("Invalid name for new feature")
    throw "Invalid feature name";
  }
  LOG.info("Creating new feature: {name}", {name});
  const FEAT_BASE = "feat/";
  return await BasicBranching.createBranch(repo, FEAT_BASE + repo);
}


module.exports = {
  create
}