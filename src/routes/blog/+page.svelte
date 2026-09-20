<script lang="ts">
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>All posts — JD van Staden</title>
	<meta name="description" content="All posts by JD van Staden." />
</svelte:head>

<main class="public-content">
	<section class="page-intro compact">
		<h1>All posts</h1>
		<p>Everything I’ve published here, newest first.</p>
	</section>

	<hr />

	<section class="content-section">
		{#if data.tags.length > 0}
			<nav class="topic-list" aria-label="Topics">
				<span>Topics</span>
				{#each data.tags as tag (tag.id)}
					<a href="/blog/tag/{tag.slug}">{tag.name}</a>
				{/each}
			</nav>
		{/if}

		{#if data.posts.length === 0}
			<p class="empty-state">No posts yet.</p>
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
