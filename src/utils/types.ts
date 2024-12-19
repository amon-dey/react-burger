import PropTypes from 'prop-types';

export type ingredientItem = {
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

export const IngredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
}).isRequired;

export type ingredientItemGroupName = {
    type: string;
    translated_name: string;
}

export const ingredientItemTypes: Array<ingredientItemGroupName> = [
    { type: "bun", translated_name: "Булки" },
    { type: "main", translated_name: "Начинки" },
    { type: "sauce", translated_name: "Соусы" }
];

export default ingredientItem