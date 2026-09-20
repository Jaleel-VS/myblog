<script lang="ts">
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.tag.name} — JD van Staden</title>
	<meta name="description" content="Posts tagged {data.tag.name}" />
</svelte:head>

<main class="public-content">
	<section class="page-intro compact">
		<a href="/blog" class="back-link">← All posts</a>
		<h1>{data.tag.name}</h1>
		<p>Posts filed under this topic.</p>
	</section>

	<hr />

	<section class="content-section">
		{#if data.tags.length > 0}
			<nav class="topic-list" aria-label="Topics">
				<span>Topics</span>
				{#each data.tags as tag (tag.id)}
					<a href="/blog/tag/{tag.slug}" class:active={tag.slug === data.tag.slug}>{tag.name}</a>
				{/each}
			</nav>
		{/if}

		{#if data.posts.length === 0}
			<p class="empty-state">No posts with this tag yet.</p>
		{:else}
			<div class="post-list">
				{#each data.posts as post (post.id)}
					<a href="/blog/{post.slug}" class="post-row">
						<span class="post-copy">
							<strong>{post.title}</strong>
							{#if post.excerpt}<small>{post.excerpt}</small>{/if}
						</span>
						<time>{formatDateShort(post.publishedAt ?? post.createdAt)}</time>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</main>
