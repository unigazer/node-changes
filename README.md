# Noder - (Node release)

Get the release changelog right from your terminal!

Whenever Node releases a new version of the framework I want to read the changelog, and then I thought: "Why not make changelogs supernerdy so that I can read the right from my terminal?". And then it happened. I decided to read the GitHub v3 RESTful API and created a CLI tool that let's your read the changelog for your local Node version or for a specific node version.

# Install
```bash
npm i -g node-changes
```

# Usage
```bash
noder -c # Prints the changelog for the local version
```

```bash
noder -t [tag] # Prints the changelog for the particular version
```

# Example
```bash
$ noder -t v10.5.0

Changelog for v10.5.0 

### Notable Changes


- crypto:
  - Support for crypto.scrypt() has been added. #20816 (https://github.com/nodejs/node/pull/20816)
- fs:
  - BigInt support has been added to fs.stat and fs.watchFile. #20220 (https://github.com/nodejs/node/pull/20220)
  - APIs that take mode as arguments no longer throw on values larger than
  0o777. #20636 (https://github.com/nodejs/node/pull/20636) #20975 (https://github.com/nodejs/node/pull/20975) (Fixes: #20498 (https://github.com/nodejs/node/issues/20498))
  - Fix crashes in closed event watchers. #20985 (https://github.com/nodejs/node/pull/20985) (Fixes: #20297 (https://github.com/nodejs/node/issues/20297))
  - Worker Threads:
  - Support for multi-threading has been added behind the
  --experimental-worker flag in the worker_threads module. This feature
  is experimental and may receive breaking changes at any time. #20876 (https://github.com/nodejs/node/pull/20876)


### Commits
...
```