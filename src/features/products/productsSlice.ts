import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductsResponse } from './types';

interface GetProductsArgs {
	limit?: number;
	skip?: number;
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsResponse, GetProductsArgs>({
			query: ({ limit = 10, skip = 0 }) =>
				`/products?limit=${limit}&skip=${skip}`,

			serializeQueryArgs: ({ endpointName }) => endpointName,

			merge: (currentCache, newPage) => {
				const existingIds = new Set(
					currentCache.products.map((p) => p.id)
				);
				const filtered = newPage.products.filter(
					(p) => !existingIds.has(p.id)
				);

				currentCache.products.push(...filtered);
				currentCache.total = newPage.total;
				currentCache.skip = newPage.skip;
				currentCache.limit = newPage.limit;
			},

			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.skip !== previousArg?.skip;
			},
		}),
	}),
});

export const { useGetProductsQuery } = productsApi;
