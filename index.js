#!/usr/bin/env node

import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import { program } from 'commander';
import getChangelog from './utils/getChangelog.js';

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer(),
  mangle: false,
  headerIds: false
});

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
