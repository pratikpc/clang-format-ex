import { RunCommand } from '.';
import Preprocess from '../util/Preprocess';

export default async function IgnoredFiles() {
    try {
        return Preprocess(
            (
                await RunCommand(
                    'git',
                    ['status', '--ignored', '-s'],
                    false
                )
            ).stdout
                .split('\n')
                .map((file) => file.trim())
                .filter((file) => file.startsWith('!!'))
                .map((file) =>
                    file.trim().substring(3).trim()
                )
        );
    } catch (err) {
        // Ignored
    }
    return [];
}
