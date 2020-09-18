import { spawn } from 'child_process';
import { red, white } from 'colors/safe';
import type { DEFAULT_EMPTY_STDOUT } from '../util/Display';

async function RunCommand(
    app: Readonly<string>,
    commands: readonly string[] = []
) {
    return await new Promise<typeof DEFAULT_EMPTY_STDOUT>(
        (resolve, reject) => {
            let stdout = '';
            let stderr = '';
            const run = spawn(app, commands);

            run.stdout.on('data', (data: Buffer) => {
                process.stdout.write(
                    white(data.toString())
                );
                stdout += data;
            });
            run.on('error', (err) => reject(err));
            run.stderr.on('data', (data: Buffer) => {
                process.stderr.write(red(data.toString()));
                stderr += data;
            });
            run.on('close', (code) => {
                if (code !== 0) reject(new Error(stderr));
                else
                    resolve({
                        stdout: stdout,
                        stderr: stderr,
                        show: false
                    });
            });
        }
    );
}

export default async function ClangFormat(commands: string[]) {
    return await RunCommand('clang-format', commands);
}
