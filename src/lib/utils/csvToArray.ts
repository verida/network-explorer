export const csv2json = (str: string, delimiter = ","): any[] => {
    str = str.trim();
    const titles = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    return rows.map((row: string) => {
        const values = row.split(delimiter);
        return titles.reduce(
            (object: any, curr: string, i: number) => ((object[curr] = values[i]), object),
            {}
        );
    });
};
