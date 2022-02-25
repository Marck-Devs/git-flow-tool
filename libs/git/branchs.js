const {
    SimpleLogger
} = require('mk-simple-logger');
const { logError } = require('../error');
const commander = require('../runner');

/**
 * Get the list of the repo's Branchs
 * @param {String} repo the path of the repo
 * @returns {Promise<Array>} the branch list
 */
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

/**
 * Create a new branch from the current commit(HEAD) or from the reference
 * that pass as base for the branch
 * @param {String} repo the path of the repo
 * @param {string} branch name of the new branch
 * @param {string} base the reference to generate the new branch
 * @returns {Promise<boolean>} if the branch have been created 
 */
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

/**
 * Delete a branch from the repo
 * @param {string} repo the repo path
 * @param {string} branch the branch name
 * @returns {Promise<boolean>} if has been delete
 */
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
       return false;
    }
}

module.exports = {
    createListBranchs,
    createBranch,
    deleteBranch
}