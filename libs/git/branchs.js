const {
    SimpleLogger
} = require('mk-simple-logger');
const { logError } = require('../error');
const commander = require('../runner');

async function createListBranchs(repo) {
    const CMD = `git -C ${repo} branch --list`;
    const LOG = new SimpleLogger("List Branchs");
    LOG.info("Listing branchs")
    const REGEX = /^\*?\s*(?<branch>.*)/;
    const OUT = new Array();
    try {
        const RESULT = await commander(CMD);
        const BRANCHES_SPLIT = RESULT.trim().split('\n');
        for (const LINE of BRANCHES_SPLIT) {
            const REGEX_RESULT = LINE.match(REGEX);
            if (REGEX_RESULT) {
                const GROUPS = REGEX_RESULT.groups;
                if (GROUPS) {
                    OUT.push(GROUPS.branch);
                }
            }
        }
        return OUT;
    } catch (err) {
        logError(LOG, err);
    }
}

async function createBranch(repo, branch, base = "") {
    const LOG = new SimpleLogger("Branch Create")
    LOG.info("Creating new branch {branch}", {
        branch
    });
    const CMD = `git -C ${repo} branch ${branch} ${base}`;
    try {
        await commander(CMD);
        return true;
    } catch (err) {
        logError(LOG, err);
    }
    return false;
}

async function deleteBranch(repo, branch) {
    const LOG = new SimpleLogger("Delete Branch");
    const CMD = `git -C ${repo} branch -d ${branch}`;
    try {
        LOG.info("Deleting branch {branch}", {
            branch
        });
        await commander(CMD);
        return true;
    } catch (err) {
       logError(LOG, err);
    }
}

module.exports = {
    createListBranchs,
    createBranch,
    deleteBranch
}