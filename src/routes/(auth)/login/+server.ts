import { PUBLIC_TWITCH_REDIRECT_URI } from '$env/static/public';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	const { code, state } = (await request.json()) as { code: string; state: string };
	console.log(code);
	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2('twitch', code, state, PUBLIC_TWITCH_REDIRECT_URI);
	} catch (err) {
		console.error(err);
		throw error(500, 'Something went wrong logging in');
	}

	return json({ success: true });
};
