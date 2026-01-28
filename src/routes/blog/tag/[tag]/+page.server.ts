import { db } from '$lib/server/db';
import { posts, tags, postTags } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// Find the tag
	const tag = await db
		.select()
		.from(tags)
		.where(eq(tags.slug, params.tag))
		.limit(1);

	if (tag.length === 0) {
		error(404, 'Tag not found');
	}

	// Get all published posts with this tag
	const taggedPosts = await db
		.select({
			id: posts.id,
			title: posts.title,
			slug: posts.slug,
			excerpt: posts.excerpt,
			publishedAt: posts.publishedAt,
			createdAt: posts.createdAt
		})
		.from(posts)
		.innerJoin(postTags, eq(postTags.postId, posts.id))
		.where(eq(postTags.tagId, tag[0].id))
		.orderBy(desc(posts.publishedAt));

	// Filter only published posts
	const publishedPosts = [];
	for (const post of taggedPosts) {
		const fullPost = await db
			.select({ published: posts.published })
			.from(posts)
			.where(eq(posts.id, post.id))
			.limit(1);

		if (fullPost[0]?.published) {
			// Get tags for this post
			const postTagsResult = await db
				.select({
					id: tags.id,
					name: tags.name,
					slug: tags.slug
				})
				.from(tags)
				.innerJoin(postTags, eq(postTags.tagId, tags.id))
				.where(eq(postTags.postId, post.id));

			publishedPosts.push({
				...post,
				tags: postTagsResult
			});
		}
	}

	// Get all tags for sidebar
	const allTags = await db.select().from(tags).orderBy(tags.name);

	return {
		tag: tag[0],
		posts: publishedPosts,
		tags: allTags
	};
};
