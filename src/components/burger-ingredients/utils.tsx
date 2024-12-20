export function groupBy<T>(list: T[], keyGetter: (item: T) => string): { [key: string]: T[] } {
    const map = new Map<string, T[]>();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (collection) {
            collection.push(item);
        } else {
            map.set(key, [item]);
        }
    });
    return Object.fromEntries(map);
}