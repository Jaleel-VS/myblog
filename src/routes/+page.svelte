<script lang="ts">
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>JD van Staden — Writing</title>
	<meta name="description" content="Notes on software, learning, media, and whatever else has my attention." />
</svelte:head>

<main class="public-content">
	<section class="page-intro">
		<h1>Writing</h1>
		<p>Notes on software, learning, media, and whatever else has my attention.</p>
	</section>

	<hr />

	<section class="content-section" aria-labelledby="recent-posts">
		<h2 id="recent-posts" class="section-heading">Recent posts</h2>
		{#if data.posts.length === 0}
			<p class="empty-state">No posts yet.</p>
		{:else}
			<div class="post-list">
				{#each data.posts as post (post.id)}
					<a href="/blog/{post.slug}" class="post-row">
						<span class="post-copy">
							<strong>{post.title}</strong>
							{#if post.tags.length > 0}
								<small>{post.tags.map((tag) => tag.name).join(' · ')}</small>
							{/if}
						</span>
						<time>{formatDateShort(post.publishedAt ?? post.createdAt)}</time>
					</a>
				{/each}
			</div>
			<a href="/blog" class="text-link archive-link">All posts →</a>
		{/if}
	</section>
</main>
