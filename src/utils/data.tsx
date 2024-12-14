export type Ingredient = {
    "_id": string
    "name": string
    "type": string
    "proteins": number
    "fat": number
    "carbohydrates": number,
    "calories": number,
    "price": number,
    "image": string,
    "image_mobile": string,
    "image_large": string,
    "__v": number,
}

export type IngredientGroupNames = {
    type: string
    translated_name: string
}

export const ingredientTypes: Array<IngredientGroupNames> = [
    { type: "bun", translated_name: "Булки" },
    { type: "main", translated_name: "Начинки" },
    { type: "sauce", translated_name: "Соусы" }
];

export default Ingredient