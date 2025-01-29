
import { API_TOKEN } from './../utils/constants'

const checkResponse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        try {
            const json = await response.json();
            if (json.success === false) {
                return Promise.reject(json.message);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return response.json();
};

export const request = async (url: string, options: RequestInit) => {
    return await fetch(url, options).then(checkResponse);
};

// Функция для чтения данных из localStorage
export const loadFromLocalStorage = (key: string, defaultvalue: string): string => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
            return defaultvalue;
        }
        return JSON.parse(storedValue);
    } catch (error) {
        console.error('Ошибка при чтении из localStorage:', error);
        return defaultvalue;
    }
};

// Функция для сохранения данных в localStorage
export const saveToLocalStorage = (key: string, item: string) => {
    try {
        const serializedItem = JSON.stringify(item);
        localStorage.setItem(key, serializedItem);
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }
};

const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
    const res = await fetch(API_TOKEN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    const refreshData = await checkReponse(res);
    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": refreshData.accessToken
                }
            }
            //options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};