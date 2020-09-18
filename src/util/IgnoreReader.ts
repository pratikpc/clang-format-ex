import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import Preprocess from './Preprocess';

export default class IgnoreReader {
    public Files: string[] = [resolve('./gitignore')];

    constructor(...Files: string[]) {
        this.Files = Files.filter((file) =>
            existsSync(resolve(file))
        );
    }

    public get Read() {
        return Promise.all(
            this.Files.map((file) => readFile(file))
        )
            .then((buffers) =>
                buffers
                    .map((buffer) => buffer.toString())
                    .map((lines) => lines.split('\n'))
            )
            .then((lines) => Preprocess(lines));
    }
}
