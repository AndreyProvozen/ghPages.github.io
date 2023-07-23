import { configureStore } from '@reduxjs/toolkit';

import flashMessageReducer from './slices/flashMessages.slice';
import linksReducer from './slices/links.slice';

const store = configureStore({
  reducer: { links: linksReducer, flashMessages: flashMessageReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
