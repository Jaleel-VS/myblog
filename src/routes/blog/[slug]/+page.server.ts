import { db } from '$lib/server/db';
import { posts, tags, postTags } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await db
		.select()
		.from(posts)
		.where(and(eq(posts.slug, params.slug), eq(posts.published, true)))
		.limit(1);

	if (post.length === 0) {
		error(404, 'Post not found');
	}

	const postTagsResult = await db
		.select({
			id: tags.id,
			name: tags.name,
			slug: tags.slug
		})
		.from(tags)
		.innerJoin(postTags, eq(postTags.tagId, tags.id))
		.where(eq(postTags.postId, post[0].id));

	return {
		post: post[0],
		tags: postTagsResult
	};
};
