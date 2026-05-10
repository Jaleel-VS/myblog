<script lang="ts">
	import { formatDate, parseMarkdown } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const htmlContent = $derived(parseMarkdown(data.post.content));
</script>

<svelte:head>
	<title>{data.post.title} — JD van Staden</title>
	{#if data.post.excerpt}
		<meta name="description" content={data.post.excerpt} />
	{/if}
</svelte:head>

<div class="sw-wrap" style="max-width:860px">
	<article class="sw-article">
		<header class="sw-article-header">
			<a href="/blog" class="sw-article-back">← All posts</a>
			<h1>{data.post.title}<span class="sw-red">.</span></h1>
			<div class="sw-article-meta">
				<time>{formatDate(data.post.publishedAt ?? data.post.createdAt)}</time>
				{#if data.tags.length > 0}
					<span class="sw-mono" style="color:var(--rule-soft);">/</span>
					<div class="sw-tags-inline">
						{#each data.tags as tag (tag.id)}
							<a href="/blog/tag/{tag.slug}" class="sw-tag">{tag.name}</a>
						{/each}
					</div>
				{/if}
			</div>
		</header>

		<div class="sw-prose">
			{@html htmlContent}
		</div>

		<footer class="sw-article-footer">
			<a href="/blog" class="sw-article-back">← All posts</a>
		</footer>
	</article>
</div>
