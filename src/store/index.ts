import { configureStore } from '@reduxjs/toolkit';

import { queryApi } from './api';
import flashMessageReducer from './slices/flashMessages.slice';

const store = configureStore({
  reducer: { flashMessages: flashMessageReducer, [queryApi.reducerPath]: queryApi.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(queryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
