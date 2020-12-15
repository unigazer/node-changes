#!/usr/bin/env node

// Imports
const got = require('got');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const program = require('commander');
const chalk = require('chalk');

marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer(),
});

// Detect loacal Node version
const localVer = process.version;

// Get the release log
async function getChangelog(tag) {
    const json = await got(`https://api.github.com/repos/nodejs/node/releases/tags/${tag}`);
    try {
        // Store the response
        const data = JSON.parse(json.body);
        // Format the publish date
        const releaseDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'long'
        }).format(new Date(data.published_at));
        // Print to terminal
        console.log(chalk.bgGreen(chalk.black(`\n Changelog for ${tag} \n`)));
        console.log(`Released on ${chalk.green.bold(releaseDate)} \n`);
        console.log(`${marked(data.body)}`);
    } catch (error) {
        return console.error(error);
    }
};

// CLI flags
program
    .option('-c, --current', 'Get changelog for the local version')
    .option('-t, --tag [ver]', 'Get changelog for the particular release')
    .parse(process.argv);

if (program.current) {
    // Local Node.js version
    getChangelog(localVer);
} else {
    // Release with a specific tag
    getChangelog(program.tag);
}
