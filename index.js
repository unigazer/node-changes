#!/usr/bin/env node

// Imports
import got from 'got';
import marked from 'marked';
import TerminalRenderer from 'marked-terminal';
import { program } from 'commander';
import chalk from 'chalk';

marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer(),
});

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
    .option('-t, --tag [ver]', 'Get changelog for the particular release')
    .parse(process.argv);

const options = program.opts();

if (options.tag) {
    // Release with a specific tag
    getChangelog(options.tag);
} else {
    // Detect local Node version
    const localVer = process.version

    // Local Node.js version
    getChangelog(localVer);
}
