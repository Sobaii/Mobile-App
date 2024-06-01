import { configureStore, combineReducers } from "@reduxjs/toolkit";

// TODO implement MMKV persistent storage in expo
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import logger from "redux-logger";
import authReducer from "./reducers/authSlice";

const rootReducer = combineReducers({
    auth: authReducer
});

// Configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

// export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
