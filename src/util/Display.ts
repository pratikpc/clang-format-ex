import { red, white } from 'colors/safe';

export function ShowError<T>(...args: T[]) {
    const text = args.join(' ');
    return console.error(red(text));
}
export function ShowMessage<T>(...args: T[]) {
    const text = args.join(' ');
    return console.log(white(text));
}
export function Show<T>(
    type: 'error' | 'message',
    ...args: T[]
) {
    if (type === 'error') return ShowError(args);
    if (type === 'message') return ShowMessage(args);
    console.log(args);
}

export const DEFAULT_EMPTY_STDOUT = {
    stdout: '',
    stderr: '',
    show: false
};
