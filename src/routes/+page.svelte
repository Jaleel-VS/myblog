<script lang="ts">
	import { formatDate } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>jaleel's thoughts</title>
	<meta name="description" content="thoughts, stories, and ideas." />
</svelte:head>

<div class="hero">
	<h1>thoughts, stories,<br />and ideas.</h1>
</div>

<section class="posts">
	{#if data.posts.length === 0}
		<p class="empty">No posts yet.</p>
	{:else}
		<div class="post-list">
			{#each data.posts as post, i (post.id)}
				<a href="/blog/{post.slug}" class="post-item">
					<span class="post-number">{String(i + 1).padStart(2, '0')}</span>
					<div class="post-content">
						<h2>{post.title}</h2>
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
					<span class="arrow">&rarr;</span>
				</a>
			{/each}
		</div>

		<a href="/blog" class="view-all">View all posts</a>
	{/if}
</section>

<style>
	.hero {
		padding: 8rem 2rem 6rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero h1 {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 600;
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: #000;
	}

	.posts {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem 6rem;
	}

	.empty {
		color: #999;
		font-size: 1rem;
	}

	.post-list {
		border-top: 1px solid #e0e0e0;
	}

	.post-item {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2rem 0;
		border-bottom: 1px solid #e0e0e0;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.post-item:hover {
		padding-left: 1rem;
	}

	.post-item:hover h2 {
		color: #666;
	}

	.post-number {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: #999;
		min-width: 1.5rem;
	}

	.post-content {
		flex: 1;
	}

	.post-content h2 {
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		transition: color 0.2s ease;
	}

	.post-meta {
		font-size: 0.8125rem;
		color: #999;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.separator {
		color: #ccc;
	}

	.tags {
		color: #666;
	}

	.arrow {
		font-size: 1.25rem;
		color: #ccc;
		transition: all 0.2s ease;
	}

	.post-item:hover .arrow {
		color: #000;
		transform: translateX(4px);
	}

	.view-all {
		display: inline-block;
		margin-top: 3rem;
		font-size: 0.875rem;
		color: #666;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.view-all:hover {
		color: #000;
	}

	@media (max-width: 640px) {
		.hero {
			padding: 6rem 1.5rem 4rem;
		}

		.posts {
			padding: 0 1.5rem 4rem;
		}

		.post-item {
			gap: 1rem;
		}

		.post-number {
			display: none;
		}
	}
</style>
