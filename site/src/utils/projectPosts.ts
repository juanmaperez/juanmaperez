import { getCollection } from 'astro:content';

export async function getSortedProjects() {
	const projects = await getCollection('projects');
	return [...projects].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getProjectSlugFromPath(path: string): string {
	const prefix = '/projects/';
	if (!path.startsWith(prefix) || path === '/projects' || path === '/projects/') {
		throw new Error(`Invalid project path for slug: ${path}`);
	}
	return path.slice(prefix.length);
}
