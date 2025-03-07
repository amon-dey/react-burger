import { loadFromLocalStorage, request, saveToLocalStorage } from "./utils";

// Мокаем fetch
global.fetch = jest.fn();

// Создаем собственный мок для Response
class MockResponse {
    bodyUsed = false;
    headers = new Headers();
    ok: boolean;
    redirected = false;
    status: number;
    statusText = '';
    type = 'default' as const;
    url = '';

    private responseBody: string | null;

    constructor(body: string | null, status: number) {
        this.responseBody = body;
        this.status = status;
        this.ok = status >= 200 && status < 300;
    }

    json() {
        if (this.responseBody === null) {
            throw new Error('Response body is null');
        }
        return JSON.parse(this.responseBody);
    }

    text() {
        return Promise.resolve(this.responseBody || '');
    }

    arrayBuffer() {
        throw new Error('arrayBuffer not implemented in MockResponse');
    }

    blob() {
        throw new Error('blob not implemented in MockResponse');
    }

    formData() {
        throw new Error('formData not implemented in MockResponse');
    }

    clone() {
        return new MockResponse(this.responseBody, this.status);
    }
}

describe('request', () => {
    it('должен вызвать fetch с правильным URL и параметрами', async () => {
        const mockResponse = { success: true, data: 'test' };
        (fetch as jest.Mock).mockResolvedValueOnce(new MockResponse(JSON.stringify(mockResponse), 200));

        const url = 'https://example.com';
        const options = { method: 'GET' };

        const result = await request<typeof mockResponse>(url, options);

        expect(fetch).toHaveBeenCalledWith(url, options);
        expect(result).toEqual(mockResponse);
    });

    it('должен обработать ошибки в ответе', async () => {
        const mockError = { success: false, message: 'Error message' };
        (fetch as jest.Mock).mockResolvedValueOnce(new MockResponse(JSON.stringify(mockError), 400));

        const url = 'https://example.com';
        const options = { method: 'GET' };

        await expect(request(url, options)).rejects.toEqual(mockError);
    });
});

describe('loadFromLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('должен вернуть сохраненное значение, если оно существует', () => {
        const key = 'testKey';
        const value = 'testValue';
        localStorage.setItem(key, JSON.stringify(value));

        const result = loadFromLocalStorage(key, 'defaultValue');
        expect(result).toBe(value);
    });

    it('должен вернуть значение по умолчанию, если ключ отсутствует', () => {
        const key = 'nonExistentKey';
        const defaultValue = 'defaultValue';

        const result = loadFromLocalStorage(key, defaultValue);
        expect(result).toBe(defaultValue);
    });
});

describe('saveToLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('должен сохранить элемент в localStorage', () => {
        const key = 'testKey';
        const value = 'testValue';

        saveToLocalStorage(key, value);

        const storedValue = localStorage.getItem(key);
        expect(storedValue).toBe(JSON.stringify(value));
    });
});