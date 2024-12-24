
const checkResponse = async (res: Response) => {
    if (res.ok) {
        return await res.json();
    }
    return await res.json().then(() => Promise.reject("Ошибка"));
};

export const request = async (url: string) => {
    return await fetch(url).then(checkResponse);
};
