import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './type';
import { RootState } from '../store';

interface LoginCredentials {
	username: string;
	password: string;
	expiresInMins?: number;
}

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}
interface LoginResponse extends User, RefreshResponse {}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://dummyjson.com',
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.accessToken;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),

	tagTypes: ['User'],
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginCredentials>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useLoginMutation } = authApi;
