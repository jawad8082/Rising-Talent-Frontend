import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import contractReducer from "./slices/contractSlice";
import marketplaceReducer from "./slices/marketplaceSlice";
import userReducer from "./slices/userSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//   key: "contract",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, contractReducer);

const configuredStore = configureStore({
  reducer: {
    // contract: persistedReducer,
    contract: contractReducer,
    marketplace: marketplaceReducer,
    user: userReducer,
  },
});

// export const store = persistStore(configuredStore);
export const store = configuredStore;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
