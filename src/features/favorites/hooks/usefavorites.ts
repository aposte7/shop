import { useDispatch, useSelector } from 'react-redux';
import {
	addToFavorites,
	removeFromFavorites,
	toggleFavorite,
} from '../favoritesSlice';
import { Product } from '@/features/products/types';
import { AppDispatch, RootState } from '@/features/store';

export const useFavorites = () => {
	const dispatch = useDispatch<AppDispatch>();
	const favorites = useSelector((state: RootState) => state.favorites.items);
	const favoriteIds = new Set(favorites.map((p) => p.id));

	const isFavorite = (productId: number) => favoriteIds.has(productId);

	const toggle = (product: Product) => {
		dispatch(toggleFavorite(product));
	};

	const add = (product: Product) => {
		dispatch(addToFavorites(product));
	};

	const remove = (productId: number) => {
		dispatch(removeFromFavorites(productId));
	};

	return { favorites, isFavorite, toggle, add, remove };
};
