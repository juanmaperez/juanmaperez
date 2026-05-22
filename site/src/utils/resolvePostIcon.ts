/** Resolve frontmatter `icon` to a stable public URL (full-size PNG, legacy background rendering). */
export function resolvePostIcon(iconPath: string | undefined): string | undefined {
	if (!iconPath) return undefined;
	const basename = iconPath.split('/').pop();
	if (!basename) return undefined;
	return `/icons/${basename}`;
}
