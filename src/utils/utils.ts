import { IngredientItemType } from './types'

export const fillIngredientsByIds = (list1: string[], list2: Array<IngredientItemType> | null): Array<IngredientItemType> => {
    const result: Array<IngredientItemType> = [];
    if (list2 === null) {
        return result
    }
    const ingredientMap = new Map<string, IngredientItemType>();

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
