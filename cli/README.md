@wolox/cookbook
===================

Wolox Cookbook CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@wolox/cookbook.svg)](https://npmjs.org/package/@wolox/cookbook)
[![Downloads/week](https://img.shields.io/npm/dw/@wolox/cookbook.svg)](https://npmjs.org/package/@wolox/cookbook)
[![License](https://img.shields.io/npm/l/@wolox/cookbook.svg)](https://github.com/Wolox/frontend-cookbook/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @wolox/cookbook
$ cookbook COMMAND
running command...
$ cookbook (-v|--version|version)
@wolox/cookbook/0.1.0 darwin-x64 node-v10.15.3
$ cookbook --help [COMMAND]
USAGE
  $ cookbook COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cookbook help [COMMAND]`](#cookbook-help-command)
* [`cookbook install TECH CATEGORY RECIPE`](#cookbook-install-tech-category-recipe)

## `cookbook help [COMMAND]`

display help for cookbook

```
USAGE
  $ cookbook help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `cookbook install TECH CATEGORY RECIPE`

Installs a recipe from the cookbook

```
USAGE
  $ cookbook install TECH CATEGORY RECIPE

OPTIONS
  -d, --directory=directory  Directory to install the recipe into
  -h, --help                 show CLI help

EXAMPLE
  $ cookbook install react buttons button-1
```

_See code: [src/commands/install.ts](https://github.com/Wolox/frontend-cookbook/blob/v0.1.0/src/commands/install.ts)_
<!-- commandsstop -->
