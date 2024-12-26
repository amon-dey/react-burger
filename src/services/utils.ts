
const checkResponse = async (res: Response) => {
    if (res.ok) {
        return await res.json();
    }
    return await res.json().then(() => Promise.reject("Ошибка"));
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