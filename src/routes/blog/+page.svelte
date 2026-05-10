<script lang="ts">
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Writing — JD van Staden</title>
	<meta name="description" content="All posts by JD van Staden." />
</svelte:head>

<section class="sw-section-head">
	<div class="label">§ <span class="sw-red">Writing</span></div>
	<h1>All posts<span class="sw-red">.</span></h1>
</section>

<div class="sw-page" style="padding-top:32px">
	{#if data.tags.length > 0}
		<div class="sw-content-grid">
			<main>
				{#if data.posts.length === 0}
					<p class="sw-empty">No posts yet.</p>
				{:else}
					<div class="sw-post-list">
						{#each data.posts as post, i (post.id)}
							<a href="/blog/{post.slug}" class="sw-post-row">
								<span class="n">{String(i + 1).padStart(2, '0')}</span>
								<div>
									<div class="title">{post.title}</div>
									{#if post.excerpt}
										<div class="excerpt">{post.excerpt}</div>
									{/if}
								</div>
								<div class="date">{formatDateShort(post.publishedAt ?? post.createdAt)}</div>
								<span class="arr">→</span>
							</a>
						{/each}
					</div>
				{/if}
			</main>

			<aside class="sw-sidebar">
				<div class="lbl">Topics</div>
				<div class="sw-tag-list">
					{#each data.tags as tag (tag.id)}
						<a href="/blog/tag/{tag.slug}" class="sw-tag-link">{tag.name}</a>
					{/each}
				</div>
			</aside>
		</div>
	{:else}
		{#if data.posts.length === 0}
			<p class="sw-empty">No posts yet.</p>
		{:else}
			<div class="sw-post-list">
				{#each data.posts as post, i (post.id)}
					<a href="/blog/{post.slug}" class="sw-post-row">
						<span class="n">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<div class="title">{post.title}</div>
							{#if post.excerpt}
								<div class="excerpt">{post.excerpt}</div>
							{/if}
						</div>
						<div class="date">{formatDateShort(post.publishedAt ?? post.createdAt)}</div>
						<span class="arr">→</span>
					</a>
				{/each}
			</div>
		{/if}
	{/if}
</div>
