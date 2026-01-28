import { redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'changeme';
const SESSION_SECRET = env.SESSION_SECRET || 'super-secret-session-key';

// Simple hash function for session token
function hashSession(password: string): string {
	let hash = 0;
	const str = password + SESSION_SECRET;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}
	return Math.abs(hash).toString(36);
}

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('admin_session');
	const validToken = hashSession(ADMIN_PASSWORD);
	const isAuthenticated = sessionToken === validToken;

	// Expose auth status to routes
	event.locals.isAuthenticated = isAuthenticated;

	// Protect admin routes (except login page)
	if (event.url.pathname.startsWith('/admin') && !event.url.pathname.startsWith('/admin/login')) {
		if (!isAuthenticated) {
			redirect(303, '/admin/login');
		}
	}

	// Redirect away from login if already authenticated
	if (event.url.pathname === '/admin/login' && isAuthenticated) {
		redirect(303, '/admin');
	}

	return resolve(event);
};
