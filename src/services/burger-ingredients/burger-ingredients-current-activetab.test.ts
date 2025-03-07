import { currentActiveTabSlice, setCurrentActiveTab } from './burger-ingredients-current-activetab';
import { readActiveTabFromStorage } from './burger-ingredients-current-activetab';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils';
import { ingredientItemTypes } from '../../utils/types';

jest.mock('../utils', () => ({
    loadFromLocalStorage: jest.fn(),
    saveToLocalStorage: jest.fn(),
}));

jest.mock('../../utils/types', () => ({
    ingredientItemTypes: [
        { type: 'bun' },
        { type: 'sauce' },
        { type: 'main' },
    ],
}));

describe('currentActiveTabSlice', () => {
    describe('initial state', () => {
        it('начальное состояние', () => {
            const initialState = currentActiveTabSlice.getInitialState();
            expect(initialState.currentActiveTab).toBe(ingredientItemTypes[0].type);
        });
    });

    describe('setCurrentActiveTab reducer', () => {
        it('currentActiveTab', () => {
            const newState = 'sauce';
            const action = setCurrentActiveTab(newState);
            const state = currentActiveTabSlice.reducer(undefined, action);

            expect(state.currentActiveTab).toBe(newState);
        });

        it('должен вызывать saveToLocalStorage с правильными аргументами', () => {
            const newState = 'sauce';
            const action = setCurrentActiveTab(newState);
            currentActiveTabSlice.reducer(undefined, action);

            expect(saveToLocalStorage).toHaveBeenCalledWith('currentActiveTab', newState);
        });
    });
});

describe('readActiveTabFromStorage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('должен возвращать значение из localStorage, если оно валидно', () => {
        (loadFromLocalStorage as jest.Mock).mockReturnValue('sauce');

        const result = readActiveTabFromStorage();
        expect(result).toBe('sauce');
    });

    it('должен возвращать дефолтное значение, если сохраненное значение невалидно', () => {
        (loadFromLocalStorage as jest.Mock).mockReturnValue('invalid');

        const result = readActiveTabFromStorage();
        expect(result).toBe(ingredientItemTypes[0].type);
    });

    it('должен возвращать дефолтное значение, если localStorage пустой', () => {
        (loadFromLocalStorage as jest.Mock).mockReturnValue(null);

        const result = readActiveTabFromStorage();
        expect(result).toBe(ingredientItemTypes[0].type);
    });
});