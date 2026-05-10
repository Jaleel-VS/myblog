<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin — Edit: {data.post.title}</title>
</svelte:head>

<div style="margin-bottom:32px;">
	<a href="/admin/posts" class="adm-action">← Posts</a>
</div>

<div style="margin-bottom:32px; display:flex; align-items:baseline; gap:12px;">
	<span class="sw-mono sw-mute" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase">
		§ <span class="sw-red">Edit post</span>
	</span>
	{#if data.post.published}
		<a href="/blog/{data.post.slug}" target="_blank" class="adm-action" style="font-size:11px">View live →</a>
	{/if}
</div>

{#if form?.error}
	<div class="adm-alert adm-alert-err">{form.error}</div>
{/if}

<form method="POST" use:enhance class="adm-form-wrap">
	<div class="adm-field">
		<label for="title" class="adm-label">Title</label>
		<input
			type="text"
			name="title"
			id="title"
			value={data.post.title}
			required
			class="adm-input"
		/>
	</div>

	<div class="adm-field">
		<label for="excerpt" class="adm-label">
			Excerpt <span class="adm-hint">optional — auto-generated if empty</span>
		</label>
		<input
			type="text"
			name="excerpt"
			id="excerpt"
			value={data.post.excerpt ?? ''}
			class="adm-input"
		/>
	</div>

	<div class="adm-field">
		<label for="content" class="adm-label">
			Content <span class="adm-hint">Markdown supported</span>
		</label>
		<textarea name="content" id="content" rows="20" required class="adm-textarea adm-input"
			>{data.post.content}</textarea
		>
	</div>

	{#if data.tags.length > 0}
		<div class="adm-field">
			<span class="adm-label">Tags</span>
			<div class="adm-check-group">
				{#each data.tags as tag (tag.id)}
					<label class="adm-check-label">
						<input
							type="checkbox"
							name="tags"
							value={tag.id}
							checked={data.postTagIds.includes(tag.id)}
						/>
						{tag.name}
					</label>
				{/each}
			</div>
		</div>
	{/if}

	<div class="adm-field" style="margin-bottom:40px">
		<label class="adm-check-label">
			<input type="checkbox" name="published" id="published" checked={data.post.published} />
			<span class="adm-label" style="margin:0">Published</span>
		</label>
	</div>

	<div style="display:flex;gap:12px;">
		<button type="submit" class="adm-btn adm-btn-ink">Save changes</button>
		<a href="/admin/posts" class="adm-btn adm-btn-ghost">Cancel</a>
	</div>
</form>
