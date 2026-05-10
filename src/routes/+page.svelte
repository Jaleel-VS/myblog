<script lang="ts">
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>JD van Staden — Writing</title>
	<meta name="description" content="Thoughts, stories, and ideas from JD van Staden." />
</svelte:head>

<!-- Hero -->
<section class="sw-hero">
	<h1>
		Thoughts,<br />
		stories,<br />
		and ideas<span class="sw-red">.</span>
	</h1>
</section>

<!-- Recent posts -->
<section class="sw-page" style="padding-bottom:0">
	<div style="display:flex;justify-content:space-between;align-items:baseline;padding:24px 0 0;border-bottom:1px solid var(--rule);margin-bottom:0">
		<span class="sw-mono" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)">
			§ <span class="sw-red">01</span> — Recent
		</span>
	</div>

	{#if data.posts.length === 0}
		<p class="sw-empty">No posts yet.</p>
	{:else}
		<div class="sw-post-list">
			{#each data.posts as post, i (post.id)}
				<a href="/blog/{post.slug}" class="sw-post-row">
					<span class="n">{String(i + 1).padStart(2, '0')}</span>
					<div>
						<div class="title">{post.title}</div>
						{#if post.tags.length > 0}
							<div class="excerpt" style="margin-top:4px;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em;color:var(--mute)">
								{post.tags.map((t) => t.name).join(' · ')}
							</div>
						{/if}
					</div>
					<div class="date">{formatDateShort(post.publishedAt ?? post.createdAt)}</div>
					<span class="arr">→</span>
				</a>
			{/each}
		</div>

		<a href="/blog" class="sw-view-all">All posts →</a>
	{/if}
</section>

<div style="padding-bottom:120px"></div>
