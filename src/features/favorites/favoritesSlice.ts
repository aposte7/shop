import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/types';

interface FavoritesState {
	items: Product[];
}

const loadFavoritesFromStorage = (): Product[] => {
	if (typeof window === 'undefined') return [];
	const stored = localStorage.getItem('favorites');
	return stored ? JSON.parse(stored) : [];
};

const saveFavoritesToStorage = (items: Product[]) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('favorites', JSON.stringify(items));
	}
};

const initialState: FavoritesState = {
	items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<Product>) => {
			const exists = state.items.some((p) => p.id === action.payload.id);
			if (!exists) {
				state.items.push(action.payload);
				saveFavoritesToStorage(state.items);
			}
		},
		removeFromFavorites: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((p) => p.id !== action.payload);
			saveFavoritesToStorage(state.items);
		},
		toggleFavorite: (state, action: PayloadAction<Product>) => {
			const exists = state.items.some((p) => p.id === action.payload.id);
			if (exists) {
				state.items = state.items.filter(
					(p) => p.id !== action.payload.id
				);
			} else {
				state.items.push(action.payload);
			}
			saveFavoritesToStorage(state.items);
		},
	},
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } =
	favoritesSlice.actions;

export default favoritesSlice.reducer;
