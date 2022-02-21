const {
    exec
} = require('child_process');
const {
    SimpleLogger
} = require('mk-simple-logger');

function runCMD(cmd) {
    return new Promise(async (resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            const logger = new SimpleLogger('CMD Worker');
            logger.info("Running command: {cmd}", {
                cmd
            });
            if (error || stderr) {
                const err = stderr.split('\n')[0];
                logger.error("Command sterr: {err}", {
                    err
                });
                reject(err);
            }
            if (stdout) {
                logger.info("Command done! ");
                resolve(stdout);
            }
        })
    })
}
module.exports = runCMD;