import { redirect, type Handle } from '@sveltejs/kit';
import { isValidAdminSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('admin_session');
	const isAuthenticated = isValidAdminSession(sessionToken);

	// Expose auth status to routes
	event.locals.isAuthenticated = isAuthenticated;

	const routeId = event.route.id;
	const isLoginRoute = routeId === '/admin/login';
	const isAdminRoute = routeId === '/admin' || routeId?.startsWith('/admin/');

	// Protect admin page loads and actions using the matched route, not the raw URL.
	if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
		redirect(303, '/admin/login');
	}

	// Let POST actions through so an authenticated admin can log out.
	if (
		isLoginRoute && isAuthenticated
		&& (event.request.method === 'GET' || event.request.method === 'HEAD')
	) {
		redirect(303, '/admin');
	}

	return resolve(event);
};
