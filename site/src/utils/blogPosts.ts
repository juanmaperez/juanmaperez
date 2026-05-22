import { getCollection } from 'astro:content';
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
