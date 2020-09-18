# CLANG FORMAT EXTENDED
[![NPM](https://img.shields.io/npm/v/clang-format-ex)](https://www.npmjs.com/package/clang-format-ex) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.md) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Install with
```cmd
  > npm i clang-format-ex -g
```

## Usage

```cmd
  > clang-format-ex -i .
```

Replace a call to clang-format with clang-format-ex and see the magic happen

clang-format-ex is also Cross-Platform and works on Linux, Windows, Mac etc.

By default, Clang-Format cannot support globs and cannot be configured to ignore .gitignore or any other folder easily

## IGNORE
1. [.gitignore](https://git-scm.com/docs/gitignore)
2. .clang-format-ignore

Add glob of content to ignore to either of these files

## How It Works?

1. Takes all Globs as Input
2. Find the names of all files that satisfy the Globs
3. Perform Clang-Format processing on all these files

## Requirements?

1. Need to have clang-format installed