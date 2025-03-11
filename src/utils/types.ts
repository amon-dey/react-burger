export interface ApiResponseError {
    success: boolean;
    message?: string;
}

export interface IBasicPaylod {
    success: boolean;
}

export interface IIngredient {
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
    "uuid"?: string | undefined
}

export interface PayloadIngedients extends IBasicPaylod {
    data: IIngredient[],
}

export interface IPostOrder {
    ingredients: Array<string>
}

export type IIngredientItemGroupNameType = {
    type: string;
    translated_name: string;
}

export const ingredientItemTypes: Array<IIngredientItemGroupNameType> = [
    { type: "bun", translated_name: "Булки" },
    { type: "main", translated_name: "Начинки" },
    { type: "sauce", translated_name: "Соусы" }
];

export default IIngredient

export interface IUserType {
    email: string
    name: string
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface IOrderBasic {
    name: string;
    _id: string;
    status: "created" | "pending" | "done";
    number: number;
    createdAt: string
    updatedAt: string
}

export interface IOrderFeed extends IOrderBasic {
    ingredients: Array<string>;
    ingredientsFull?: Array<IIngredient>;   
}

export interface IOrderIngredientsFullInfo extends IOrderBasic {
    ingredients: Array<IIngredient>;
}

export interface IFeed {
    status: boolean;
    orders: Array<IOrderFeed>;
    total: number;
    totalToday: number;
}

export interface IUserPayload {
    accessToken: string;
    refreshToken: string;
    user: IUserType;
}

export interface ICreateOrderPaylod extends IBasicPaylod {
    name: string
    order: IOrderIngredientsFullInfo
}

export interface IFeedOrderInfo extends IBasicPaylod {
    orders: Array<IOrderFeed>
}