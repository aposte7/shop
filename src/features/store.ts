import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products/productsApi';
import favoritesReducer from './favorites/favoritesSlice';
import authReducer from './auth/authSlice';
import { authApi } from './auth/authApi';

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		favorites: favoritesReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			productsApi.middleware,
			authApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
