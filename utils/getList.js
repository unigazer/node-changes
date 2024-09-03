import chalk from 'chalk';
import ora from 'ora';

// Get the release log
export default async function getList() {
  const spinner = ora(`Fetching the versions`);

  try {
    const res = await fetch('https://api.github.com/repos/nodejs/node/releases?per_page=100');

    // Start the spinner animation
    spinner.start();

    // Store the response
    const data = await res.json();

    if (data.message === 'Not Found') {
      spinner.stop();
      ora().fail(chalk.red.bold(`Error: The changelog for the version v${tag} was not found.`));

      return;
    }

    // Stop the spinner animation
    spinner.stop();

    // Print to terminal
    console.log(chalk.bgGreen(chalk.black(`\n Available releases (last 100)`)));
    console.log(chalk.bgYellow(chalk.black('\n NOTE: The even number (major version) is the LTS release. \n')))
    const list = data
      .map((element) => Number(element.tag_name.split('.').join('').substring(1)))
      .sort((a, b) => a - b)
      .map((ver) => {
        if (ver < 10000) {
          return ver.toString().replace(/(\d{2})(\d{1})(\d{1})/, '$1.$2.$3');
        } else {
          return ver.toString().replace(/(\d{2})(\d{2})(\d{1})/, '$1.$2.$3');
        }
      })
      .sort((a, b) => {
        const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
        const [bMajor, bMinor, bPatch] = b.split('.').map(Number);

        if (aMajor !== bMajor) return aMajor - bMajor;
        if (aMinor !== bMinor) return aMinor - bMinor;
        return aPatch - bPatch;
      });

    console.log(list);
  } catch (error) {
    console.error(error);
  }
}
