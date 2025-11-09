import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../authSlice';
import { AppDispatch, RootState } from '@/features/store';
import { User } from '../type';
import { toast } from 'sonner';
import { useState } from 'react';

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { user, accessToken, isAuthenticated } = useSelector(
		(state: RootState) => state.auth
	);

	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const DEMO_EMAIL = 'demo@demo.com';
	const DEMO_PASSWORD = 'demo123';

	const loginUser = async (email: string, password: string) => {
		setIsLoggingIn(true);
		try {
			if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
				toast.error('Invalid demo credentials');
				throw new Error('Invalid demo credentials');
			}

			await new Promise((res) => setTimeout(res, 250));

			const username = || 'demo';
			const dummyUser: User = {
				id: 1,
				username,
				email,
				firstName: 'Demo',
				lastName: 'User',
				gender: 'male',
				image: "",
				role: 'admin',
			};

			const demoToken = 'demo-token';
			const demoRefresh = 'demo-refresh-token';

			dispatch(
				setCredentials({
					user: dummyUser,
					accessToken: demoToken,
					refreshToken: demoRefresh,
				})
			);

			toast.success('Successfully Logged In (demo)');

			return { user: dummyUser, accessToken: demoToken };
		} catch (error) {
			console.error('Login failed (demo):', error);
			throw error;
		} finally {
			setIsLoggingIn(false);
		}
	};

	const isAdmin = user?.role === 'admin';

	return {
		user,
		accessToken,
		isAuthenticated,
		isAdmin,
		loginUser,
		isLoading: isLoggingIn,
	};
};
