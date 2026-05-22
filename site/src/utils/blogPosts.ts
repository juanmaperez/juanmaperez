import { getCollection, type CollectionEntry } from 'astro:content';
import { POSTS_PER_PAGE } from '../constants/blog';

export async function getSortedPosts() {
	return (await getCollection('posts')).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);
}

export function getNumPages(totalPosts: number): number {
	return Math.ceil(totalPosts / POSTS_PER_PAGE);
}

/** 1-based page index (page 1 = newest chunk). */
export function getPostsForPage<T extends { data: { date: Date } }>(
	posts: T[],
	page: number,
): T[] {
	const start = (page - 1) * POSTS_PER_PAGE;
	return posts.slice(start, start + POSTS_PER_PAGE);
}

export function getBlogSlugFromPath(path: string): string {
	const prefix = '/blog/';
	if (!path.startsWith(prefix) || path === '/blog' || path === '/blog/') {
		throw new Error(`Invalid post path for blog slug: ${path}`);
	}
	return path.slice(prefix.length);
}

export function getAdjacentPosts(
	posts: CollectionEntry<'posts'>[],
	entry: CollectionEntry<'posts'>,
) {
	const index = posts.findIndex((p) => p.id === entry.id);
	if (index < 0) return { prev: null, next: null };
	return {
		prev: index > 0 ? posts[index - 1]! : null,
		next: index < posts.length - 1 ? posts[index + 1]! : null,
	};
}

export function getDistinctCategories(
	posts: CollectionEntry<'posts'>[],
): string[] {
	return [...new Set(posts.map((p) => p.data.category))].sort();
}

export function getPostsByCategory(
	posts: CollectionEntry<'posts'>[],
	category: string,
): CollectionEntry<'posts'>[] {
	return posts.filter((p) => p.data.category === category);
}

export function getCategoryPath(category: string): string {
	return `/blog/category/${category}`;
}
