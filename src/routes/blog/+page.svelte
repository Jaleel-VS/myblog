<script lang="ts">
	import { formatDate } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Archive</title>
	<meta name="description" content="All blog posts" />
</svelte:head>

<div class="archive">
	<header class="page-header">
		<h1>Archive</h1>
		<p class="count">{data.posts.length} posts</p>
	</header>

	<div class="content-grid">
		<main class="posts">
			{#if data.posts.length === 0}
				<p class="empty">No posts yet.</p>
			{:else}
				{#each data.posts as post, i (post.id)}
					<a href="/blog/{post.slug}" class="post-item">
						<span class="post-number">{String(i + 1).padStart(2, '0')}</span>
						<div class="post-content">
							<h2>{post.title}</h2>
							{#if post.excerpt}
								<p class="excerpt">{post.excerpt}</p>
							{/if}
							<div class="post-meta">
								<time>{formatDate(post.publishedAt ?? post.createdAt)}</time>
								{#if post.tags.length > 0}
									<span class="separator">/</span>
									<span class="tags">
										{#each post.tags as tag, j (tag.id)}{tag.name}{#if j < post.tags.length - 1}, {/if}{/each}
									</span>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</main>

		{#if data.tags.length > 0}
			<aside class="sidebar">
				<h3>Topics</h3>
				<div class="tag-list">
					{#each data.tags as tag (tag.id)}
						<a href="/blog/tag/{tag.slug}" class="tag">{tag.name}</a>
					{/each}
				</div>
			</aside>
		{/if}
	</div>
</div>

<style>
	.archive {
		max-width: 1200px;
		margin: 0 auto;
		padding: 6rem 2rem;
	}

	.page-header {
		margin-bottom: 4rem;
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 600;
	}

	.count {
		font-size: 0.875rem;
		color: #999;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 240px;
		gap: 4rem;
	}

	.posts {
		border-top: 1px solid #e0e0e0;
	}

	.empty {
		padding: 2rem 0;
		color: #999;
	}

	.post-item {
		display: flex;
		gap: 2rem;
		padding: 2rem 0;
		border-bottom: 1px solid #e0e0e0;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.post-item:hover {
		padding-left: 1rem;
	}

	.post-number {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: #ccc;
		padding-top: 0.25rem;
	}

	.post-content {
		flex: 1;
	}

	.post-content h2 {
		font-size: 1.125rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		transition: color 0.2s ease;
	}

	.post-item:hover h2 {
		color: #666;
	}

	.excerpt {
		font-size: 0.9375rem;
		color: #666;
		line-height: 1.6;
		margin-bottom: 0.75rem;
	}

	.post-meta {
		font-size: 0.8125rem;
		color: #999;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.separator {
		color: #ddd;
	}

	.tags {
		color: #666;
	}

	.sidebar {
		position: sticky;
		top: 6rem;
		align-self: start;
	}

	.sidebar h3 {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #999;
		margin-bottom: 1rem;
	}

	.tag-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.tag {
		font-size: 0.9375rem;
		color: #666;
		transition: color 0.2s ease;
	}

	.tag:hover {
		color: #000;
	}

	@media (max-width: 900px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.sidebar {
			position: static;
			border-top: 1px solid #e0e0e0;
			padding-top: 2rem;
			margin-top: 2rem;
		}

		.tag-list {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem 1rem;
		}
	}

	@media (max-width: 640px) {
		.archive {
			padding: 4rem 1.5rem;
		}

		.post-item {
			gap: 1rem;
		}

		.post-number {
			display: none;
		}
	}
</style>
