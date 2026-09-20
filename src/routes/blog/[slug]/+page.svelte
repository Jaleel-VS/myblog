<script lang="ts">
	import { formatDate, parseMarkdown } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const htmlContent = $derived(parseMarkdown(data.post.content));
</script>

<svelte:head>
	<title>{data.post.title} — JD van Staden</title>
	{#if data.post.excerpt}<meta name="description" content={data.post.excerpt} />{/if}
</svelte:head>

<main class="article-shell">
	<article>
		<header class="article-header">
			<a href="/blog" class="back-link">← All posts</a>
			<h1>{data.post.title}</h1>
			<div class="article-meta">
				<time>{formatDate(data.post.publishedAt ?? data.post.createdAt)}</time>
				{#each data.tags as tag (tag.id)}
					<a href="/blog/tag/{tag.slug}">{tag.name}</a>
				{/each}
			</div>
		</header>

		<div class="article-prose">
			{@html htmlContent}
		</div>

		<footer class="article-footer">
			<a href="/blog" class="back-link">← All posts</a>
		</footer>
	</article>
</main>
