import { wiki } from '$lib/wiki';

import type { PageLoad } from './$types';

export const load = (async () => {
	const page = await wiki.page('Svelte');

	return { page };
}) satisfies PageLoad;
