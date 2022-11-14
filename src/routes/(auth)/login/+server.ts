import { PUBLIC_TWITCH_REDIRECT_URI } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (!code || !state) {
		throw error(400, 'Missing code or state');
	}

	if (state !== cookies.get('state')) {
		throw error(400, 'Invalid state');
	}

	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2('twitch', code, state, PUBLIC_TWITCH_REDIRECT_URI);
	} catch (err) {
		console.error(err);
		throw error(500, 'Something went wrong logging in');
	}

	throw redirect(302, '/');
};
