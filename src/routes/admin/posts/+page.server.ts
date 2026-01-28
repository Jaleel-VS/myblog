import { db } from '$lib/server/db';
import { posts, tags, postTags } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const allPosts = await db
		.select()
		.from(posts)
		.orderBy(desc(posts.createdAt));

	const postsWithTags = await Promise.all(
		allPosts.map(async (post) => {
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

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Post ID is required' });
		}

		const postId = parseInt(id, 10);
		if (isNaN(postId)) {
			return fail(400, { error: 'Invalid post ID' });
		}

		await db.delete(posts).where(eq(posts.id, postId));

		return { success: true };
	},

	togglePublish: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Post ID is required' });
		}

		const postId = parseInt(id, 10);
		if (isNaN(postId)) {
			return fail(400, { error: 'Invalid post ID' });
		}

		const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

		if (post.length === 0) {
			return fail(404, { error: 'Post not found' });
		}

		const newPublished = !post[0].published;
		await db
			.update(posts)
			.set({
				published: newPublished,
				publishedAt: newPublished ? new Date() : null,
				updatedAt: new Date()
			})
			.where(eq(posts.id, postId));

		return { success: true };
	}
};
