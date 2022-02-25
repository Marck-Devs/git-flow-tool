module.exports = {
  BasicBranching : require("./branchs"),
  LogUtils: require("./gitlog"),
  BasicStatus: require("./fileStatus"),
  Checkout: require("./checkout").checkout,
  Tags: require("./tagging")
}