import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export const useProtectedRoute = () => {
	const { isAuthenticated, isAdmin, isLoading } = useAuth();
	const router = useRouter();
	const checkAuth = useCallback(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/admin/login');
		} else if (!isLoading && !isAdmin) {
			router.push('/admin/unauthorized');
		}
	}, [isAuthenticated, isAdmin, isLoading, router]);

	checkAuth();
};
