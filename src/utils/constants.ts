
const BASE_HOST = "norma.nomoreparties.space"
const BASE_URL = "https://" + BASE_HOST;
const BASE_WSURL = "wss://" + BASE_HOST;
export const API_INGREDIENTS = BASE_URL + "/api/ingredients";
export const API_MAKE_ORDER = BASE_URL + "/api/orders";
export const API_LOGIN = BASE_URL + "/api/auth/login"
export const API_REGISTER = BASE_URL + "/api/auth/register"
export const API_LOGOUT = BASE_URL + "/api/auth/logout"
export const API_TOKEN = BASE_URL + "/api/auth/token"
export const API_RESETPASSWORD = BASE_URL + "/api/password-reset/reset"
export const API_FORGOTPASSWORD = BASE_URL + "/api/password-reset"
export const API_USER = BASE_URL + "/api/auth/user"
export const API_ORDER = BASE_URL + "/api/orders/"

export const API_WS_ALLFEED = BASE_WSURL + "/orders/all"
export const API_WS_PROFILE_FEED = BASE_WSURL+"/orders"