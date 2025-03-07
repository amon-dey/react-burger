import { userSlice, setIsAuthChecked, setUser } from './user';
import { login, logout, postRegister, userGetInfo, userSetInfo } from '../thunks/thunks';

describe('userSlice', () => {
  describe('initial state', () => {
    it('должен инициализировать начальное состояние', () => {
      const initialState = userSlice.getInitialState();
      expect(initialState).toEqual({
        user: null,
        isAuthChecked: false,
        lastError: null,
      });
    });
  });

  describe('reducers', () => {
    it('setIsAuthChecked должен обновлять isAuthChecked', () => {
      const action = setIsAuthChecked(true);
      const state = userSlice.reducer(undefined, action);

      expect(state.isAuthChecked).toBe(true);
    });

    it('setUser должен устанавливать пользователя', () => {
      const mockUser = { email: 'test@example.com', name: 'Test User' };
      const action = setUser(mockUser);
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('extraReducers', () => {
    it('login.pending должен очищать lastError', () => {
      const action = { type: login.pending.type };
      const state = userSlice.reducer(undefined, action);

      expect(state.lastError).toBe('');
    });

    it('login.fulfilled должен устанавливать пользователя и токены', () => {
      const mockPayload = {
        user: { email: 'test@example.com', name: 'Test User' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      const action = { type: login.fulfilled.type, payload: mockPayload };
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.isAuthChecked).toBe(true);
      expect(state.lastError).toBe('');
      expect(localStorage.getItem('accessToken')).toBe(mockPayload.accessToken);
      expect(localStorage.getItem('refreshToken')).toBe(mockPayload.refreshToken);
    });

    it('login.rejected должен устанавливать lastError', () => {
      const mockError = 'Ошибка входа';
      const action = { type: login.rejected.type, payload: mockError };
      const state = userSlice.reducer(undefined, action);

      expect(state.lastError).toBe(mockError);
    });

    it('logout.rejected', () => {
      const action = { type: logout.rejected.type };
      const state = userSlice.reducer(undefined, action);
      1
      expect(state.lastError).toBe('');
      expect(state.user).toBe(null);
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('logout.fulfilled должен сбрасывать пользователя и токены', () => {
      const action = { type: logout.fulfilled.type };
      const initialState = {
        user: { email: 'test@example.com', name: 'Test User' },
        isAuthChecked: true,
        lastError: '',
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.user).toBeNull();
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('postRegister.fulfilled должен устанавливать пользователя и токены', () => {
      const mockPayload = {
        user: { email: 'test@example.com', name: 'Test User' },
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      const action = { type: postRegister.fulfilled.type, payload: mockPayload };
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.isAuthChecked).toBe(true);
      expect(localStorage.getItem('accessToken')).toBe(mockPayload.accessToken);
      expect(localStorage.getItem('refreshToken')).toBe(mockPayload.refreshToken);
    });

    it('postRegister.rejected должен очищать токены и устанавливать ошибку', () => {
      const mockError = 'Ошибка регистрации';
      const action = { type: postRegister.rejected.type, payload: mockError };
      const state = userSlice.reducer(undefined, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.lastError).toBe(mockError);
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('userGetInfo.rejected должен устанавливать isAuthChecked', () => {
      const action = { type: userGetInfo.rejected.type };
      const state = userSlice.reducer(undefined, action);
      expect(state.isAuthChecked).toBe(true);
    });

    it('userGetInfo.fulfilled должен устанавливать пользователя', () => {
      const mockPayload = { user: { email: 'test@example.com', name: 'Test User' } };
      const action = { type: userGetInfo.fulfilled.type, payload: mockPayload };
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('userSetInfo.fulfilled должен обновлять пользователя', () => {
      const mockPayload = { user: { email: 'updated@example.com', name: 'Updated User' } };
      const action = { type: userSetInfo.fulfilled.type, payload: mockPayload };
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toEqual(mockPayload.user);
      expect(state.isAuthChecked).toBe(true);
    });
  });
});