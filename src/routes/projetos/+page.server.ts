import { projetos } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const allFeatures = [...new Set(projetos.flatMap(projeto => projeto.tecnologias))];
	return { projetos, allFeatures };
}) satisfies PageServerLoad;
