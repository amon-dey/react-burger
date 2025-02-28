import PropTypes from 'prop-types';

export interface IngredientItemType {
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
    "uuid": string | undefined
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

export type IngredientItemGroupNameType = {
    type: string;
    translated_name: string;
}

export const ingredientItemTypes: Array<IngredientItemGroupNameType> = [
    { type: "bun", translated_name: "Булки" },
    { type: "main", translated_name: "Начинки" },
    { type: "sauce", translated_name: "Соусы" }
];

export default IngredientItemType

export type UserType = {
    email: string
    name: string
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface IOrderType {
    ingredients: Array<string>;
    ingredientsFull: Array<IngredientItemType>;
    _id: string;
    name: string;
    status: "created" | "pending" | "done";
    number: number;
    createdAt: string
    updatedAt: string
}

export interface IFeed {
    status: boolean;
    orders: Array<IOrderType>;
    total: number;
    totalToday: number;
}

