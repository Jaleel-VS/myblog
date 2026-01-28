import { pgTable, serial, text, boolean, timestamp, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	content: text('content').notNull(),
	excerpt: text('excerpt'),
	published: boolean('published').notNull().default(false),
	publishedAt: timestamp('published_at', { withTimezone: true }),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique()
});

export const postTags = pgTable(
	'post_tags',
	{
		postId: integer('post_id')
			.notNull()
			.references(() => posts.id, { onDelete: 'cascade' }),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' })
	},
	(table) => [primaryKey({ columns: [table.postId, table.tagId] })]
);

// Relations
export const postsRelations = relations(posts, ({ many }) => ({
	postTags: many(postTags)
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	postTags: many(postTags)
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
	post: one(posts, {
		fields: [postTags.postId],
		references: [posts.id]
	}),
	tag: one(tags, {
		fields: [postTags.tagId],
		references: [tags.id]
	})
}));
