import { combineReducers, configureStore } from '@reduxjs/toolkit';
import languageReducer from '../reducer/language';

const rootReducer = combineReducers({
  language: languageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

