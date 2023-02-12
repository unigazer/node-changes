#!/usr/bin/env node

// Imports
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer(),
});

// Get the release log
async function getChangelog(tag) {
    const spinner = ora(`Fetching the changelog for v${tag}`);

    try {
        const res = await fetch(`https://api.github.com/repos/nodejs/node/releases/tags/v${tag}`);
        // Start the spinner animation
        spinner.start();
        // Store the response
        const data = await res.json();
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
        // Stop the spinner animation
        spinner.stop();
        // Print to terminal
        console.log(chalk.bgGreen(chalk.black(`\n Changelog for v${tag} \n`)));
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
    const localVer = process.version.substring(1);

    // Local Node.js version
    getChangelog(localVer);
}
