import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { COOKIE_NAME } from '$lib/constants';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('================HOOK===================');
	const cookie = event.request.headers.get('cookie');
	console.log('Before Hook:', cookie);

	event.locals.pb = new PocketBase('http://127.0.0.1:8090');

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(cookie || '', COOKIE_NAME);

	if (event.locals.pb.authStore.isValid) {
		console.log('AuthStore is valid');
		event.locals.user = structuredClone(event.locals.pb.authStore.model) ?? undefined;
	} else {
		console.log('AuthStore is invalid');
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	// send back cookie to the client with the latest store state
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: !dev }, COOKIE_NAME)
	);

	return response;
};