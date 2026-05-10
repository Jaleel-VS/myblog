<script lang="ts">
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.tag.name} — JD van Staden</title>
	<meta name="description" content="Posts tagged {data.tag.name}" />
</svelte:head>

<section class="sw-section-head">
	<div class="label">
		§ <span class="sw-red">Tag</span>
	</div>
	<h1>
		<span style="color:var(--mute)">/</span> {data.tag.name}<span class="sw-red">.</span>
	</h1>
</section>

<div class="sw-page" style="padding-top:32px">
	<div class="sw-content-grid">
		<main>
			{#if data.posts.length === 0}
				<p class="sw-empty">No posts with this tag yet.</p>
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

		{#if data.tags.length > 0}
			<aside class="sw-sidebar">
				<div class="lbl">Topics</div>
				<div class="sw-tag-list">
					{#each data.tags as tag (tag.id)}
						<a
							href="/blog/tag/{tag.slug}"
							class="sw-tag-link"
							class:active={tag.slug === data.tag.slug}
						>
							{tag.name}
						</a>
					{/each}
				</div>
			</aside>
		{/if}
	</div>
</div>
