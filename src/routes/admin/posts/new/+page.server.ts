import { db } from '$lib/server/db';
import { posts, tags, postTags } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { generateSlug, generateExcerpt } from '$lib';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const allTags = await db.select().from(tags).orderBy(tags.name);
	return { tags: allTags };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');
		const excerpt = formData.get('excerpt');
		const published = formData.get('published') === 'on';
		const selectedTags = formData.getAll('tags');

		if (!title || typeof title !== 'string' || title.trim() === '') {
			return fail(400, { error: 'Title is required', title, content, excerpt });
		}

		if (!content || typeof content !== 'string' || content.trim() === '') {
			return fail(400, { error: 'Content is required', title, content, excerpt });
		}

		const slug = generateSlug(title);

		// Check if slug already exists
		const existingPost = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
		if (existingPost.length > 0) {
			return fail(400, {
				error: 'A post with this title already exists',
				title,
				content,
				excerpt
			});
		}

		const autoExcerpt =
			excerpt && typeof excerpt === 'string' && excerpt.trim() !== ''
				? excerpt.trim()
				: generateExcerpt(content);

		const newPost = await db
			.insert(posts)
			.values({
				title: title.trim(),
				slug,
				content: content.trim(),
				excerpt: autoExcerpt,
				published,
				publishedAt: published ? new Date() : null
			})
			.returning();

		// Add tags
		if (selectedTags.length > 0) {
			const tagInserts = selectedTags
				.filter((tagId): tagId is string => typeof tagId === 'string')
				.map((tagId) => ({
					postId: newPost[0].id,
					tagId: parseInt(tagId, 10)
				}));

			if (tagInserts.length > 0) {
				await db.insert(postTags).values(tagInserts);
			}
		}

		redirect(303, '/admin/posts');
	}
};
