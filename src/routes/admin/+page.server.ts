import { db } from '$lib/server/db';
import { posts, tags } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const totalPosts = await db.select({ count: count() }).from(posts);
	const publishedPosts = await db
		.select({ count: count() })
		.from(posts)
		.where(eq(posts.published, true));
	const draftPosts = await db
		.select({ count: count() })
		.from(posts)
		.where(eq(posts.published, false));
	const totalTags = await db.select({ count: count() }).from(tags);

	return {
		stats: {
			totalPosts: totalPosts[0].count,
			publishedPosts: publishedPosts[0].count,
			draftPosts: draftPosts[0].count,
			totalTags: totalTags[0].count
		}
	};
};
