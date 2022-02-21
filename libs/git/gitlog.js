const {
    SimpleLogger
} = require('mk-simple-logger');
const { logError } = require('../error');
const commander = require('../runner');

async function getLogForBranch(repo, branch) {
    const CMD = `git -C ${repo} log --oneline ${branch}`;
    const LOG = new SimpleLogger('Log 4 Branch');
    let out = new Array();
    try {
        const RESULT = await commander(CMD);
        const LOG_LINES = RESULT.split('\n');
        const REGEX = /(?<commit>\w*)\s(?<text>.*)/;
        for (const COMMIT of LOG_LINES) {
            const MATCH = COMMIT.match(REGEX);
            if (!MATCH) {
                continue;
            }
            const GROUPS = MATCH.groups;
            if (GROUPS) {

                out.push({
                    id: GROUPS.commit,
                    msg: GROUPS.text
                });
            }
        }
    } catch (err) {
        logError(LOG, err);
    }
    return out;
}

async function getCommitInfo(repo, uid) {
    const CMD = `git -C ${repo} show ${uid}`;
    const LOG = new SimpleLogger('Commit Info');
    const OUT = {
        message: ""
    };
    try {
        LOG.info("Getting info for {uid} commit", {
            uid
        });
        const RESULT = await commander(CMD);
        const COMMIT_FULL_DATA = RESULT.substring(0, RESULT.indexOf("diff"));
        const COMMIT_SPLIT = COMMIT_FULL_DATA.split('\n');
        for (const LINE of COMMIT_SPLIT) {
            if (LINE.indexOf('Date:') >= 0) {
                OUT.date = LINE.substring("Date:".length).trim();
            } else if (LINE.indexOf("Author:") >= 0) {
                OUT.author = LINE.substring("Author: ".length).trim();
            } else if (LINE.indexOf("commit") >= 0) {
                OUT.id = LINE.substring('commit'.length).trim();
            } else {
                OUT.message += LINE;
            }
        }
    } catch (err) {
        logError(LOG, err);
    }
    return OUT;
}

module.exports = {
    getCommitInfo,
    getLogForBranch
}