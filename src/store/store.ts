import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice';
import { todoApi } from '../api/todoApi';


const userReducer = combineReducers({
  todo: authReducer,
  [todoApi.reducerPath]: todoApi.reducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: userReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']