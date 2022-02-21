const {
    SimpleLogger
} = require('mk-simple-logger');
const path = require('path')
const commander = require('../runner');

async function getStatusList(folder) {
    const LOG = new SimpleLogger("Untraked Files");
    const UNTRAKED_STRING = "Untracked files:\n";
    const COMMIT_STRING = "Changes to be committed:\n";
    const NOTSTAGE_STRING = "Changes not staged for commit:\n";
    const COMMAND = `git -C ${folder} status`
    let out = {
        untraked: "",
        notStage: "",
        toCommit: ""
    }
    try {
        LOG.info("Preapare to run command: {COMMAND}", {
            COMMAND
        });
        const RESULT = await commander(COMMAND);
        const COMMIT_INDEX = RESULT.indexOf(COMMIT_STRING);
        const NOTSTAGE_INDEX = RESULT.indexOf(NOTSTAGE_STRING);
        const UNTRAKED_INDEX = RESULT.indexOf(UNTRAKED_STRING);
        if (COMMIT_INDEX >= 0 && NOTSTAGE_INDEX >= 0) {
            out.toCommit = RESULT.substring(COMMIT_INDEX + COMMIT_STRING.length, NOTSTAGE_INDEX);
        } else if (COMMIT_INDEX >= 0 && UNTRAKED_INDEX >= 0) {
            out.toCommit = RESULT.substring(COMMIT_INDEX + COMMIT_STRING.length, UNTRAKED_INDEX);
        } else if (COMMIT_INDEX >= 0) {
            out.toCommit = RESULT.substring(COMMIT_INDEX + COMMIT_STRING.length);
        }
        if (NOTSTAGE_INDEX >= 0 && UNTRAKED_INDEX >= 0) {
            out.notStage = RESULT.substring(NOTSTAGE_INDEX + NOTSTAGE_STRING.length, UNTRAKED_INDEX - 1);
        } else if (NOTSTAGE_INDEX >= 0) {
            out.notStage = RESULT.substring(NOTSTAGE_INDEX + NOTSTAGE_STRING.length);
        }
        if (UNTRAKED_INDEX >= 0) {
            out.untraked = RESULT.substring(UNTRAKED_INDEX + UNTRAKED_STRING.length);
        }

        // console.log(NOTSTAGE_INDEX, COMMIT_INDEX, UNTRAKED_INDEX);
    } catch (err) {
        LOG.error(err + "");
    }
    // console.log(out);
    LOG.info("Proccesing stdout")
    return processStatus(out)
}

async function processStatus(statusList) {
    let outObj = {
        toCommit: new Array(),
        untraked: new Array(),
        notStage: new Array()
    }
    const FILE_REGEX = /(?<action>\w*(\s?\w*)?):\s*(?<file>.*)/;
    // to commit list
    if (statusList.toCommit != undefined && statusList.toCommit != "") {
        const COMM_SPLIT = statusList.toCommit.trim().split('\n').slice(1);
        let tmp = {};
        for (const FILE of COMM_SPLIT) {
            let groups = FILE.match(FILE_REGEX).groups;
            if (groups) {
                outObj.toCommit.push({
                    action: groups.action.trim(),
                    file: groups.file
                })
            }
        }
    }
    if (statusList.untraked && statusList.untraked != "") {
        const UNTRA_SPLIT = statusList.untraked.trim().split('\n').slice(1);
        for (const FILE of UNTRA_SPLIT) {
            outObj.untraked.push(FILE.trim());
        }
    }
    if (statusList.notStage && statusList.notStage != "") {
        const NOTST_SPLIT = statusList.notStage.trim().split('\n').slice(2);
        console.log(NOTST_SPLIT);
        for (const FILE of NOTST_SPLIT) {
            const GROUPS = FILE.match(FILE_REGEX).groups;
            if (GROUPS) {
                outObj.notStage.push({
                    action: GROUPS.action.trim(),
                    file: GROUPS.file
                })
            }
        }
    }
    // console.log(outObj);
    return outObj;
}

module.exports = getStatusList;