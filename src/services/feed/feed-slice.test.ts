import { feedSlice, wsOpen, wsClose, wsError, wsMessage } from './feed-slice';
import { WebsocketStatus } from '../../utils/types';
import { mockIFeed } from '../../utils/__mocks__/mockData';

describe('feedSlice', () => {
  describe('initial state', () => {
    it('должен инициализировать начальное состояние', () => {
      const initialState = feedSlice.getInitialState();
      expect(initialState).toEqual({
        status: WebsocketStatus.OFFLINE,
        error: null,
        feed: {
          status: false,
          orders: [],
          total: 0,
          totalToday: 0,
        },
      });
    });
  });

  describe('reducers', () => {
    it('wsOpen должен устанавливать статус ONLINE и очищать ошибку', () => {
      const action = wsOpen();
      const state = feedSlice.reducer(undefined, action);

      expect(state.status).toBe(WebsocketStatus.ONLINE);
      expect(state.error).toBeNull();
    });

    it('wsClose должен устанавливать статус OFFLINE', () => {
      const action = wsClose();
      const state = feedSlice.reducer(undefined, action);

      expect(state.status).toBe(WebsocketStatus.OFFLINE);
    });

    it('wsError должен устанавливать сообщение об ошибке', () => {
      const mockError = 'WebSocket connection error';
      const action = wsError(mockError);
      const state = feedSlice.reducer(undefined, action);

      expect(state.error).toBe(mockError);
    });

    it('wsMessage должен обновлять данные ленты заказов', () => {
      const action = wsMessage(mockIFeed);
      const state = feedSlice.reducer(undefined, action);

      expect(state.feed).toEqual(mockIFeed);
    });
  });
});