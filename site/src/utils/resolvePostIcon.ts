const iconModules = import.meta.glob<{ default: { src: string } }>(
	'/src/assets/icons/*.png',
	{ eager: true },
);

const iconByBasename = new Map<string, string>();
for (const [modulePath, mod] of Object.entries(iconModules)) {
	const basename = modulePath.split('/').pop();
	if (basename) {
		iconByBasename.set(basename, mod.default.src);
	}
}

/** Resolve frontmatter `icon` (e.g. `./../../../assets/icons/javascript.png`) to a built URL, or undefined. */
export function resolvePostIcon(iconPath: string | undefined): string | undefined {
	if (!iconPath) return undefined;
	const basename = iconPath.split('/').pop();
	if (!basename) return undefined;
	return iconByBasename.get(basename);
}
