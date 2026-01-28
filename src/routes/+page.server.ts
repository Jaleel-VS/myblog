import { db } from '$lib/server/db';
import { posts, tags, postTags } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Get the 5 most recent published posts
	const recentPosts = await db
		.select({
			id: posts.id,
			title: posts.title,
			slug: posts.slug,
			excerpt: posts.excerpt,
			publishedAt: posts.publishedAt,
			createdAt: posts.createdAt
		})
		.from(posts)
		.where(eq(posts.published, true))
		.orderBy(desc(posts.publishedAt))
		.limit(5);

	// Get tags for each post
	const postsWithTags = await Promise.all(
		recentPosts.map(async (post) => {
			const postTagsResult = await db
				.select({
					id: tags.id,
					name: tags.name,
					slug: tags.slug
				})
				.from(tags)
				.innerJoin(postTags, eq(postTags.tagId, tags.id))
				.where(eq(postTags.postId, post.id));

			return {
				...post,
				tags: postTagsResult
			};
		})
	);

	return {
		posts: postsWithTags
	};
};
