import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../authApi';
import { setCredentials } from '../authSlice';
import { AppDispatch, RootState } from '@/features/store';
import { User } from '../type';
import { toast } from 'sonner';

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { user, accessToken, isAuthenticated } = useSelector(
		(state: RootState) => state.auth
	);
	const [login, { isLoading: isLoggingIn }] = useLoginMutation();

	const loginUser = async (credentials: {
		username: string;
		password: string;
	}) => {
		try {
			const response = await login(credentials).unwrap();
			const { accessToken, refreshToken, ...userData } = response;

			const user: User = {
				...userData,
				role: userData.username === 'emilys' ? 'admin' : 'user',
			};

			dispatch(
				setCredentials({
					user,
					accessToken,
					refreshToken,
				})
			);

			toast.success('Successfully Logged In');

			return { user, accessToken, refreshToken };
		} catch (error) {
			console.error('Login failed:', error);
			toast.error('Invalid credential. Please try correctly again ');

			throw error;
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
