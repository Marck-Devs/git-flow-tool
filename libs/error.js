const { SimpleLogger } = require("mk-simple-logger");

/**
 * Log the error preprocesing it
 * @param {SimpleLogger} logger the reference to the logger
 * @param {any} error the error 
 * @returns {null}
 */
function logError(logger, error){
  let msg = error;
  if(typeof error != "object"){
    logger.error(error);
    return;
  }
  if(typeof error == "object"){
    try{
      msg = JSON.stringify(error, null, 2);
      logger.error(msg);
      return;
    }catch(err){}
    if(error.message != undefined){
      msg = error.message;
      logger.error(msg);
      return;
    }
    if(error.data != undefined){
      msg = error.data;
      logger.error(msg);
      return;
    }
    
    logger.error(error.toString());
    return;
  }
}

module.exports = {
  logError
}