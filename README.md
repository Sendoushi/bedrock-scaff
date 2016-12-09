# Bedrock: Scaffolding

Scaffolding to use on the frontend.

[![Build Status](https://travis-ci.org/Sendoushi/bedrock-scaff.svg?branch=master)](https://travis-ci.org/Sendoushi/bedrock-scaff)

## Installation
You need to have [node](http://nodejs.org) so you can have the package dependency management and use the tasks:
- Install [node](http://nodejs.org)

```
cd <project_folder>
npm install git://github.com/Sendoushi/bedrock-scaff.git#0.0.23
```

You could also install it globally and then just use `bedrock-scaff` on the terminal. 

```
npm install -g git://github.com/Sendoushi/bedrock-scaff.git#0.0.23
```

## Usage

```bash
$(npm bin)/bedrock-scaff --path=<project_path>
```

Or if `bedrock-scaff` was installed globally...

```bash
bedrock-scaff --path=<project_path>
```

- `<project_path>`: Path for the project.

### Gulp

```
node <gulp_path> --gulpfile=<bedrock_scaff_gulpfile> --path=<project_path>
```

- `<gulp_path>`: Pass the path to `gulp`. From example `node_modules/.bin/gulp`. You could simply use `gulp` instead if you have it globally.
- `<bedrock_scaff_gulpfile>`: Set the path for the `bedrock-tasks` gulpfile. It should be under `node_modules/bedrock-tasks/runner/gulpfile.js`. It is required.

##### Example

```sh
node ./node_modules/.bin/gulp --gulpfile="./node_modules/bedrock-scaff/runner/gulpfile.js" ./project
```
