export default function Preprocess(
    arr: string[] | string[][]
) {
    // Merge All Values into One
    let results = ([] as string[]).concat(...arr);
    results = Array.from(new Set<string>(results));
    results = results.filter(
        (command) => !/^--*?/.test(command)
    );
    // Trim the String and Remove Empty String
    results = results.map((line) => line.trim());
    // Remove Empty String and Comments
    results = results.filter(
        (line) => line.length > 0 && line[0] !== '#'
    );
    results = results.map((line) => `${line}/**`);
    results = results.map((line) =>
        line.replace(/(\\|\/\/)/g, '/')
    );
    return results;
}