import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) throw error(401, 'Unauthorized');

	return { user };
};
