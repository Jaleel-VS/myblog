import { fail, redirect } from '@sveltejs/kit';
import { ADMIN_SESSION_MAX_AGE, createAdminSession } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (!password || typeof password !== 'string') {
			return fail(400, { error: 'Password is required' });
		}

		const sessionToken = createAdminSession(password);
		if (!sessionToken) {
			return fail(401, { error: 'Invalid password' });
		}

		cookies.set('admin_session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: ADMIN_SESSION_MAX_AGE
		});

		redirect(303, '/admin');
	},

	logout: async ({ cookies }) => {
		cookies.delete('admin_session', { path: '/' });
		redirect(303, '/admin/login');
	}
};
