import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'changeme';
const SESSION_SECRET = env.SESSION_SECRET || 'super-secret-session-key';

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

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (!password || typeof password !== 'string') {
			return fail(400, { error: 'Password is required' });
		}

		if (password !== ADMIN_PASSWORD) {
			return fail(401, { error: 'Invalid password' });
		}

		const sessionToken = hashSession(ADMIN_PASSWORD);
		cookies.set('admin_session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		redirect(303, '/admin');
	},

	logout: async ({ cookies }) => {
		cookies.delete('admin_session', { path: '/' });
		redirect(303, '/admin/login');
	}
};
