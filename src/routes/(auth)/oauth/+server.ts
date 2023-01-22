import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_REDIRECT_URI } from '$env/static/public';

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	// redirect if no provider is provided
	const queryProvider = url.searchParams.get('provider');
	if (!queryProvider) throw redirect(300, '/');

	const providers = await locals.pb.collection('users').listAuthMethods();
	const provider = providers.authProviders.find((provider) => provider.name === queryProvider);

	// redirect if provider is not available
	if (!provider) throw redirect(300, '/');

	const authUrl = provider.authUrl + PUBLIC_REDIRECT_URI;

	cookies.set(
		'provider',
		JSON.stringify({
			state: provider.state,
			name: provider.name,
			codeVerifier: provider.codeVerifier,
			codeChallenge: provider.codeChallenge,
			codeChallengeMethod: provider.codeChallengeMethod,
		})
	);
	// redirect to the provider's auth url
	return new Response(null, {
		status: 302,
		headers: {
			location: authUrl,
		},
	});
};
