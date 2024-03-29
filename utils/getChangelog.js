import { marked } from 'marked';
import chalk from 'chalk';
import ora from 'ora';

// Get the release log
export default async function getChangelog(tag) {
  const spinner = ora(`Fetching the changelog for v${tag}`);

  try {
    const res = await fetch(`https://api.github.com/repos/nodejs/node/releases/tags/v${tag}`);
    
    // Start the spinner animation
    spinner.start();
    
    // Store the response
    const data = await res.json();

    if (data.message === 'Not Found') {
      spinner.stop();
      ora().fail(chalk.red.bold(`Error: The changelog for the version v${tag} was not found.`));

      return;
    }

    // Format the publish date
    const releaseDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'long',
    }).format(new Date(data.published_at));
    
    // Stop the spinner animation
    spinner.stop();
    
    // Print to terminal
    console.log(chalk.bgGreen(chalk.black(`\n Changelog for v${tag} \n`)));
    console.log(`Released on ${chalk.green.bold(releaseDate)} \n`);
    console.log(`${marked(data.body)}`);

  } catch (error) {
    console.error(error);
  }
}
