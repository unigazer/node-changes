#!/usr/bin/env node

// Imports
const axios = require('axios');
const markdown = require('markdown-cli');
const program = require('commander');
const chalk = require('chalk');

// Detect loacal Node version
var localVer = process.version;

// Get the release log
async function getChangelog(tag) {
    const json = await axios.get(`https://api.github.com/repos/nodejs/node/releases/tags/${tag}`)
    try {
        console.log(chalk.bgGreen(chalk.black(`\n Changelog for ${tag} \n`)));
        console.log(`${markdown(json.data.body)}`);
    } catch (error) {
        return console.error(error)
    }
};

// CLI flags
program
    .option('-c, --current', 'Get changelog for the local version')
    .option('-t, --tag [ver]', 'Get changelog for the particular release')
    .parse(process.argv)

if (program.current) {
    getChangelog(localVer)
} else {
    getChangelog(program.tag)
}
