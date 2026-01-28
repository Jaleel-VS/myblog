import { db } from '$lib/server/db';
import { posts, tags, postTags } from '$lib/server/db/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import { generateSlug, generateExcerpt } from '$lib';
import { eq, and, ne } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const postId = parseInt(params.id, 10);

	if (isNaN(postId)) {
		error(404, 'Post not found');
	}

	const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

	if (post.length === 0) {
		error(404, 'Post not found');
	}

	const postTagIds = await db
		.select({ tagId: postTags.tagId })
		.from(postTags)
		.where(eq(postTags.postId, postId));

	const allTags = await db.select().from(tags).orderBy(tags.name);

	return {
		post: post[0],
		postTagIds: postTagIds.map((pt) => pt.tagId),
		tags: allTags
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const postId = parseInt(params.id, 10);

		if (isNaN(postId)) {
			return fail(400, { error: 'Invalid post ID' });
		}

		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');
		const excerpt = formData.get('excerpt');
		const published = formData.get('published') === 'on';
		const selectedTags = formData.getAll('tags');

		if (!title || typeof title !== 'string' || title.trim() === '') {
			return fail(400, { error: 'Title is required' });
		}

		if (!content || typeof content !== 'string' || content.trim() === '') {
			return fail(400, { error: 'Content is required' });
		}

		const slug = generateSlug(title);

		// Check if slug already exists for a different post
		const existingPost = await db
			.select()
			.from(posts)
			.where(and(eq(posts.slug, slug), ne(posts.id, postId)))
			.limit(1);

		if (existingPost.length > 0) {
			return fail(400, { error: 'A post with this title already exists' });
		}

		// Get current post state
		const currentPost = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

		const autoExcerpt =
			excerpt && typeof excerpt === 'string' && excerpt.trim() !== ''
				? excerpt.trim()
				: generateExcerpt(content);

		// Determine publishedAt
		let publishedAt = currentPost[0]?.publishedAt;
		if (published && !currentPost[0]?.published) {
			publishedAt = new Date();
		} else if (!published) {
			publishedAt = null;
		}

		await db
			.update(posts)
			.set({
				title: title.trim(),
				slug,
				content: content.trim(),
				excerpt: autoExcerpt,
				published,
				publishedAt,
				updatedAt: new Date()
			})
			.where(eq(posts.id, postId));

		// Update tags - remove all and re-add
		await db.delete(postTags).where(eq(postTags.postId, postId));

		if (selectedTags.length > 0) {
			const tagInserts = selectedTags
				.filter((tagId): tagId is string => typeof tagId === 'string')
				.map((tagId) => ({
					postId,
					tagId: parseInt(tagId, 10)
				}));

			if (tagInserts.length > 0) {
				await db.insert(postTags).values(tagInserts);
			}
		}

		redirect(303, '/admin/posts');
	}
};
