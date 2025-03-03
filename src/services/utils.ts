
import { API_TOKEN } from './../utils/constants'
import { ApiResponseError } from './../utils/types'

const checkResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let error: ApiResponseError = { message: "Не известная ошибка", success: false }
        try {
            const json = await response.json();
            if (json && typeof json === "object" && "success" in json && json.success === false) {
                const error: ApiResponseError = json;
                return Promise.reject(error);
            }
            return Promise.reject(error);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return response.json() as T;
};

export const request = async <T>(url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    return checkResponse<T>(response);
};

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

export const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err: unknown) {
        if (err instanceof Error && err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: refreshData.accessToken,
                },
            };
            const res = await fetch(url, options);
            return await checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};