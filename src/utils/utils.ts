import { IIngredient } from './types'

export const fillIngredientsByIds = (list1: string[], list2: Array<IIngredient> | null): Array<IIngredient> => {
    const result: Array<IIngredient> = [];
    if (list2 === null) {
        return result
    }
    const ingredientMap = new Map<string, IIngredient>();

    list2.forEach(item => {
        ingredientMap.set(item._id, item);
    });

    list1.forEach(id => {
        if (ingredientMap.has(id)) {
            result.push(ingredientMap.get(id)!);
        }
    });

    return result;
}

export function getBasename() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part !== '');
    return `/${parts.join('/')}`;
}