<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin — Dashboard</title>
</svelte:head>

<div class="adm-stats">
	<div class="adm-stat">
		<div class="s-label">Total posts</div>
		<div class="s-val">{data.stats.totalPosts}</div>
	</div>
	<div class="adm-stat hi">
		<div class="s-label">Published</div>
		<div class="s-val">{data.stats.publishedPosts}</div>
	</div>
	<div class="adm-stat">
		<div class="s-label">Drafts</div>
		<div class="s-val">{data.stats.draftPosts}</div>
	</div>
	<div class="adm-stat">
		<div class="s-label">Tags</div>
		<div class="s-val">{data.stats.totalTags}</div>
	</div>
</div>

<div style="display:flex; gap:12px;">
	<a href="/admin/posts/new" class="adm-btn adm-btn-ink">New post</a>
	<a href="/admin/posts"     class="adm-btn adm-btn-ghost">Manage posts</a>
</div>
