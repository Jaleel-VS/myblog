<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin — Posts</title>
</svelte:head>

<div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:32px;">
	<span class="sw-mono sw-mute" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase">
		§ <span class="sw-red">Posts</span> — {data.posts.length} total
	</span>
	<a href="/admin/posts/new" class="adm-btn adm-btn-ink">New post</a>
</div>

{#if data.posts.length === 0}
	<p class="sw-empty">No posts yet. <a href="/admin/posts/new" class="adm-action primary">Create one →</a></p>
{:else}
	<div class="adm-table-wrap">
		<table class="adm-table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Status</th>
					<th>Tags</th>
					<th>Date</th>
					<th style="text-align:right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.posts as post (post.id)}
					<tr>
						<td>
							<div class="td-title">{post.title}</div>
							<div class="td-sub">/blog/{post.slug}</div>
						</td>
						<td>
							{#if post.published}
								<span class="adm-badge adm-badge-pub">Published</span>
							{:else}
								<span class="adm-badge adm-badge-draft">Draft</span>
							{/if}
						</td>
						<td>
							<div style="display:flex;flex-wrap:wrap;gap:4px;">
								{#each post.tags as tag (tag.id)}
									<span class="adm-chip">{tag.name}</span>
								{/each}
							</div>
						</td>
						<td style="white-space:nowrap">
							<span class="sw-mono sw-mute" style="font-size:11px">{formatDateShort(post.createdAt)}</span>
						</td>
						<td>
							<div style="display:flex;gap:16px;justify-content:flex-end;align-items:center;">
								{#if post.published}
									<a href="/blog/{post.slug}" target="_blank" class="adm-action">View</a>
								{/if}
								<a href="/admin/posts/{post.id}/edit" class="adm-action primary">Edit</a>
								<form method="POST" action="?/togglePublish" use:enhance style="display:contents">
									<input type="hidden" name="id" value={post.id} />
									<button type="submit" class="adm-action">
										{post.published ? 'Unpublish' : 'Publish'}
									</button>
								</form>
								<form
									method="POST"
									action="?/delete"
									use:enhance={() => {
										return async ({ update }) => {
											if (confirm('Delete this post?')) await update();
										};
									}}
									style="display:contents"
								>
									<input type="hidden" name="id" value={post.id} />
									<button type="submit" class="adm-action danger">Delete</button>
								</form>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
