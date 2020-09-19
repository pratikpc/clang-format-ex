import { spawn } from 'child_process';
import { red, white } from 'colors/safe';
import type { DEFAULT_EMPTY_STDOUT } from '../util/Display';

export async function RunCommand(
    app: Readonly<string>,
    commands_: readonly string[] = [],
    streamOutputToUserOnScreen = true
) {
    const commands = commands_
        .map((command) => command.trim())
        .filter((command) => command.length > 0);

    return await new Promise<typeof DEFAULT_EMPTY_STDOUT>(
        (resolve, reject) => {
            let stdout = '';
            let stderr = '';
            const run = spawn(app, commands);
            run.stdout.on('data', (data: Buffer) => {
                if (streamOutputToUserOnScreen)
                    process.stdout.write(
                        white(data.toString())
                    );
                stdout += data;
            });
            run.on('error', (err) => reject(err));
            run.stderr.on('data', (data: Buffer) => {
                if (streamOutputToUserOnScreen)
                    process.stderr.write(
                        red(data.toString())
                    );
                stderr += data;
            });
            run.on('close', (code) => {
                if (code !== 0) reject(new Error(stderr));
                else
                    resolve({
                        stdout: stdout,
                        stderr: stderr,
                        // If the Output has already been outputted to the screen
                        // Do not Output it again
                        show: !streamOutputToUserOnScreen
                    });
            });
        }
    );
}

export default async function ClangFormat(
    commands: string[]
) {
    return await RunCommand('clang-format', commands);
}
