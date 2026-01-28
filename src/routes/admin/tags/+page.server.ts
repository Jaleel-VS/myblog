import { db } from '$lib/server/db';
import { tags, postTags } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { generateSlug } from '$lib';
import { eq, count } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const allTags = await db.select().from(tags).orderBy(tags.name);

	// Get post count for each tag
	const tagsWithCount = await Promise.all(
		allTags.map(async (tag) => {
			const postCount = await db
				.select({ count: count() })
				.from(postTags)
				.where(eq(postTags.tagId, tag.id));

			return {
				...tag,
				postCount: postCount[0].count
			};
		})
	);

	return { tags: tagsWithCount };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');

		if (!name || typeof name !== 'string' || name.trim() === '') {
			return fail(400, { error: 'Tag name is required' });
		}

		const slug = generateSlug(name);

		// Check if tag already exists
		const existingTag = await db.select().from(tags).where(eq(tags.slug, slug)).limit(1);
		if (existingTag.length > 0) {
			return fail(400, { error: 'A tag with this name already exists' });
		}

		await db.insert(tags).values({
			name: name.trim(),
			slug
		});

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Tag ID is required' });
		}

		const tagId = parseInt(id, 10);
		if (isNaN(tagId)) {
			return fail(400, { error: 'Invalid tag ID' });
		}

		await db.delete(tags).where(eq(tags.id, tagId));

		return { success: true };
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Tag ID is required' });
		}

		if (!name || typeof name !== 'string' || name.trim() === '') {
			return fail(400, { error: 'Tag name is required' });
		}

		const tagId = parseInt(id, 10);
		if (isNaN(tagId)) {
			return fail(400, { error: 'Invalid tag ID' });
		}

		const slug = generateSlug(name);

		// Check if slug already exists for a different tag
		const existingTag = await db
			.select()
			.from(tags)
			.where(eq(tags.slug, slug))
			.limit(1);

		if (existingTag.length > 0 && existingTag[0].id !== tagId) {
			return fail(400, { error: 'A tag with this name already exists' });
		}

		await db
			.update(tags)
			.set({
				name: name.trim(),
				slug
			})
			.where(eq(tags.id, tagId));

		return { success: true };
	}
};
