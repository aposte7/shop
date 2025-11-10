import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category, Product, ProductsResponse } from './types';

interface GetProductsArgs {
	limit?: number;
	skip?: number;
	categorySlug?: string;
	searchQuery?: string;
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
	tagTypes: ['Products', 'Categories', 'Product', 'Search'],
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => '/products/categories',
			providesTags: ['Categories'],
		}),

		getProducts: builder.query<ProductsResponse, GetProductsArgs>({
			query: ({ limit = 10, skip = 0, categorySlug, searchQuery }) => {
				let url: string;

				if (searchQuery) {
					url = `/products/search?q=${encodeURIComponent(
						searchQuery
					)}`;
				} else if (categorySlug) {
					url = `/products/category/${categorySlug}`;
				} else {
					url = '/products';
				}

				const params = new URLSearchParams();
				params.append('limit', limit.toString());
				if (skip > 0) params.append('skip', skip.toString());

				if (searchQuery) {
					return `${url}&${params.toString()}`;
				}
				return `${url}?${params.toString()}`;
			},

			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				const { categorySlug, searchQuery } = queryArgs;
				return `${endpointName}${
					categorySlug ? `-cat-${categorySlug}` : ''
				}${searchQuery ? `-search-${searchQuery}` : ''}`;
			},

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

			providesTags: (result, _error, { categorySlug, searchQuery }) => {
				type Tag =
					| { type: 'Products'; id?: string | number }
					| { type: 'Categories'; id?: string | number }
					| { type: 'Product'; id?: string | number }
					| { type: 'Search'; id?: string | number };

				const tags: Tag[] = [
					{ type: 'Products' as const },
					{ type: 'Product' as const, id: 'LIST' },
				];

				if (categorySlug) {
					tags.push({
						type: 'Categories' as const,
						id: categorySlug,
					});
				}
				if (searchQuery) {
					tags.push({ type: 'Search' as const, id: searchQuery });
				}

				return tags;
			},
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
