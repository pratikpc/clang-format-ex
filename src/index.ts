#!/usr/bin/env node

import glob from 'fast-glob';

import { Show } from './util/Display';
import IgnoreReader from './util/IgnoreReader';
import Preprocess from './util/Preprocess';
import ClangFormat from './cmd';

const argv = process.argv.splice(2);

async function Run() {
    const ignoreReader = new IgnoreReader(
        '.gitignore',
        '.clang-format-ignore'
    );
    const sources = Preprocess(argv);
    // Set Default Value
    if (sources.length === 0)
        sources.splice(0, 0, '**/*.{cpp,cxx,c,h,hxx,hpp}');
    const commands = argv.filter((command) =>
        /^--*?/.test(command)
    );

    const files = await glob(sources, {
        ignore: ['.git',...await ignoreReader.Read],
        dot: true
    });

    return ClangFormat([...commands, ...files]);
}

Run()
    .then(({ stdout, stderr, show }) => {
        if (show === true) {
            if (stdout !== '') Show('message', stdout);
            if (stderr !== '') Show('error', stderr);
        }
        return null;
    })
    .catch((err) =>
        Show('error', err, err.stdout, err.stderr)
    );