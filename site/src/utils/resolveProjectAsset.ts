const projectImageModules = import.meta.glob<{ default: { src: string } }>(
	'../content/projects/**/*.{png,jpg,jpeg}',
	{ eager: true },
);

/** Resolve a co-located project image path (e.g. `./principal.png`) from collection entry id. */
export function resolveProjectAsset(
	projectId: string,
	relativePath: string,
): string | undefined {
	const needle = relativePath.replace(/^\.\//, '');
	const folder = projectId.split('/')[0];
	const key = Object.keys(projectImageModules).find(
		(k) => k.includes(`/${folder}/`) && k.endsWith(`/${needle}`),
	);
	return key ? projectImageModules[key].default.src : undefined;
}
