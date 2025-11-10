import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category, Product, ProductsResponse } from './types';

interface GetProductsArgs {
	limit?: number;
	skip?: number;
	categorySlug?: string;
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
	tagTypes: ['Products', 'Categories', 'Product'],
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => '/products/categories',
			providesTags: ['Categories'],
		}),

		getProducts: builder.query<ProductsResponse, GetProductsArgs>({
			query: ({ limit = 10, skip = 0, categorySlug }) => {
				const base = categorySlug
					? `/products/category/${categorySlug}`
					: '/products';
				return `${base}?limit=${limit}&skip=${skip}`;
			},

			serializeQueryArgs: ({ endpointName, queryArgs }) =>
				`${endpointName}${
					queryArgs.categorySlug ? `-${queryArgs.categorySlug}` : ''
				}`,

			merge: (currentCache, newPage) => {
				const existing = new Set(
					currentCache.products.map((p) => p.id)
				);
				const filtered = newPage.products.filter(
					(p) => !existing.has(p.id)
				);
				currentCache.products.push(...filtered);
				currentCache.total = newPage.total;
				currentCache.skip = newPage.skip;
				currentCache.limit = newPage.limit;
			},

			forceRefetch({ currentArg, previousArg }) {
				return currentArg?.skip !== previousArg?.skip;
			},

			providesTags: (result, _error, { categorySlug }) => [
				'Products' as const,
				{ type: 'Product' as const, id: 'LIST' },
				...(categorySlug
					? [{ type: 'Categories' as const, id: categorySlug }]
					: []),
			],
		}),

		getProductById: builder.query<Product, number>({
			query: (id) => `/product/${id}`,

			providesTags: (result, error, id) => [{ type: 'Product', id }],
		}),
		createProduct: builder.mutation<Product, Partial<Product>>({
			query: (newProduct) => ({
				url: 'products/add',
				method: 'POST',
				body: newProduct,
			}),
			invalidatesTags: ['Products', 'Product'],
		}),

		updateProduct: builder.mutation<
			Product,
			Partial<Product> & { id: number }
		>({
			query: ({ id, ...patch }) => ({
				url: `products/${id}`,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [
				'Products',
				{ type: 'Product', id },
			],
		}),
		deleteProduct: builder.mutation<void, number>({
			query: (id) => ({
				url: `products/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [
				'Products',
				{ type: 'Product', id },
			],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetCategoriesQuery,
} = productsApi;
