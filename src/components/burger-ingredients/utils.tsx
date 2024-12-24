import { RefObject } from 'react';

export function groupBy<T>(list: T[], keyGetter: (item: T) => string): { [key: string]: T[]; } {
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

const isElementPartiallyVisible = (element: RefObject<HTMLElement | null>, prevItemsHeight: number) => {
    if (!element.current) return false;
    const rect = element.current.getBoundingClientRect();
    if (rect.top + prevItemsHeight > 0) {
        return true;
    }
};

export const getVisibleGroup = (arrayOfGroupRefs: RefObject<HTMLDivElement>[]) => {
    let min = arrayOfGroupRefs.length - 1;
    let heighOffset = 0;
    for (let i = 0; i < arrayOfGroupRefs.length; i++) {
        const item = arrayOfGroupRefs[i];
        if (!item.current) {
            continue;
        }
        if (isElementPartiallyVisible(item, heighOffset)) {
            if (min > i) {
                min = i;
            }
        }
        heighOffset = heighOffset + item.current.getBoundingClientRect().height;
    }
    return min;
};
