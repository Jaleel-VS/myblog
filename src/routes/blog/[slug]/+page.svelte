<script lang="ts">
	import { formatDate, parseMarkdown } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const htmlContent = $derived(parseMarkdown(data.post.content));
</script>

<svelte:head>
	<title>{data.post.title}</title>
	{#if data.post.excerpt}
		<meta name="description" content={data.post.excerpt} />
	{/if}
</svelte:head>

<article class="article">
	<header>
		<a href="/blog" class="back-link">&larr; Archive</a>
		<h1>{data.post.title}</h1>
		<div class="meta">
			<time>{formatDate(data.post.publishedAt ?? data.post.createdAt)}</time>
			{#if data.tags.length > 0}
				<span class="separator">/</span>
				<span class="tags">
					{#each data.tags as tag, i (tag.id)}
						<a href="/blog/tag/{tag.slug}">{tag.name}</a>{#if i < data.tags.length - 1}, {/if}
					{/each}
				</span>
			{/if}
		</div>
	</header>

	<div class="prose">
		{@html htmlContent}
	</div>

	<footer>
		<a href="/blog" class="back-link">&larr; Back to archive</a>
	</footer>
</article>

<style>
	.article {
		max-width: 720px;
		margin: 0 auto;
		padding: 6rem 2rem;
	}

	header {
		margin-bottom: 4rem;
	}

	.back-link {
		display: inline-block;
		font-size: 0.875rem;
		color: #999;
		margin-bottom: 2rem;
		transition: color 0.2s ease;
	}

	.back-link:hover {
		color: #000;
	}

	header h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 600;
		line-height: 1.15;
		letter-spacing: -0.02em;
		margin-bottom: 1.5rem;
	}

	.meta {
		font-size: 0.875rem;
		color: #999;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.separator {
		color: #ddd;
	}

	.tags a {
		color: #666;
		transition: color 0.2s ease;
	}

	.tags a:hover {
		color: #000;
	}

	footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid #e0e0e0;
	}

	@media (max-width: 640px) {
		.article {
			padding: 4rem 1.5rem;
		}

		header {
			margin-bottom: 3rem;
		}
	}
</style>
