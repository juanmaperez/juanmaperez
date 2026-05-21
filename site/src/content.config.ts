import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		path: z.string().regex(/^\//),
		title: z.string().min(1),
		date: z.coerce.date(),
		type: z.literal('post'),
		category: z.string().min(1),
		tags: z.array(z.string()),
		excerpt: z.string(),
		icon: z.string().optional(),
		thumbnail: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({
		base: './src/content/projects',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		path: z.string().regex(/^\//),
		title: z.string().min(1),
		date: z.coerce.date(),
		// NOTE: 'projects' is intentionally plural here (matches the collection name)
		// and is asymmetric with the posts schema's `type: z.literal('post')` (singular).
		// All 5 legacy projects use `type: projects`; do NOT "normalize" to singular
		// without also rewriting every project's frontmatter.
		type: z.literal('projects'),
		category: z.string().min(1),
		thumbnail: z.string().min(1),
		excerpt: z.string(),
		images: z
			.array(
				z.object({
					title: z.string(),
					image: z.string(),
				}),
			)
			.optional(),
	}),
});

export const collections = { posts, projects };
