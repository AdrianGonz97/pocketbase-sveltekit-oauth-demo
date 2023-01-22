import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return { providers: locals.pb.collection('users').listAuthMethods() };
};
