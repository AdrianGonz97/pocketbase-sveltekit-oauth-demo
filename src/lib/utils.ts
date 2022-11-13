import { PUBLIC_TWITCH_CLIENT_ID, PUBLIC_TWITCH_REDIRECT_URI } from '$env/static/public';

export function generateState() {
	const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let array = new Uint8Array(43);

	window.crypto.getRandomValues(array);
	array = array.map((x) => validChars.charCodeAt(x % validChars.length));

	const randomState = String.fromCharCode.apply(null, [...array]);

	return randomState;
}

export function getAuthUrl(state: string) {
	const scopes = ['user:read:email'];
	const url = new URL('https://id.twitch.tv/oauth2/authorize');
	url.searchParams.set('client_id', PUBLIC_TWITCH_CLIENT_ID);
	url.searchParams.set('redirect_uri', PUBLIC_TWITCH_REDIRECT_URI);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('scope', scopes.join('+'));
	url.searchParams.set('state', state);

	return url;
}
