
import { useState, useCallback } from "react";

export const useLocalStorage = (key: string, inicialState: string) => {
    const [storedValue, setStoredValue] = useState(
        () => {
            try {
                const item = localStorage.getItem(key)
                return item ? JSON.parse(item) : inicialState
            }
            catch (error) {
                return inicialState
            }

        }
    )
    const setValue = useCallback((value: string) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }, [key]);

    return [storedValue, setValue];
};