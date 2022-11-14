import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { COOKIE_NAME } from '$lib/constants';
import { dev } from '$app/environment';
import { PUBLIC_PB_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	const cookie = event.request.headers.get('cookie');

	event.locals.pb = new PocketBase(PUBLIC_PB_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(cookie || '', COOKIE_NAME);

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = structuredClone(event.locals.pb.authStore.model) ?? undefined;
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	// send back cookie to the client with the latest store state
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: !dev, sameSite: 'lax' }, COOKIE_NAME)
	);

	return response;
};
