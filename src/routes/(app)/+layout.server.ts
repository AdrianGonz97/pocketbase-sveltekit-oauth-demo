import { generateState, getAuthUrl } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const state = generateState();
	cookies.set('state', state, {
		path: '/',
	});

	return {
		user: locals.user,
		authUrl: getAuthUrl(state).toString(),
	};
};
