import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products/productsApi';
import favoritesReducer from './favorites/favoritesSlice';

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		favorites: favoritesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
