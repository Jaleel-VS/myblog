<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let editingId = $state<number | null>(null);
	let editingName = $state('');

	function startEdit(tag: { id: number; name: string }) {
		editingId = tag.id;
		editingName = tag.name;
	}

	function cancelEdit() {
		editingId = null;
		editingName = '';
	}
</script>

<svelte:head>
	<title>Admin — Tags</title>
</svelte:head>

<div style="display:flex; align-items:baseline; justify-content:space-between; margin-bottom:32px;">
	<span class="sw-mono sw-mute" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase">
		§ <span class="sw-red">Tags</span> — {data.tags.length} total
	</span>
</div>

{#if form?.error}
	<div class="adm-alert adm-alert-err">{form.error}</div>
{/if}
{#if form?.success}
	<div class="adm-alert adm-alert-ok">Tag saved.</div>
{/if}

<!-- Add tag -->
<form method="POST" action="?/create" use:enhance style="margin-bottom:40px;">
	<div class="adm-field" style="margin-bottom:0">
		<label for="new-tag" class="adm-label">New tag</label>
		<div style="display:flex;gap:0;">
			<input
				type="text"
				name="name"
				id="new-tag"
				placeholder="Tag name"
				required
				class="adm-input"
				style="flex:1"
			/>
			<button type="submit" class="adm-btn adm-btn-ink" style="white-space:nowrap">Add tag</button>
		</div>
	</div>
</form>

{#if data.tags.length === 0}
	<p class="sw-empty">No tags yet.</p>
{:else}
	<div class="adm-table-wrap">
		<table class="adm-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Slug</th>
					<th>Posts</th>
					<th style="text-align:right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.tags as tag (tag.id)}
					<tr>
						<td>
							{#if editingId === tag.id}
								<form method="POST" action="?/update" use:enhance style="display:flex;gap:8px;align-items:center;">
									<input type="hidden" name="id" value={tag.id} />
									<input
										type="text"
										name="name"
										bind:value={editingName}
										required
										class="adm-inline-input"
									/>
									<button type="submit" class="adm-action primary">Save</button>
									<button type="button" onclick={cancelEdit} class="adm-action">Cancel</button>
								</form>
							{:else}
								<span class="td-title">{tag.name}</span>
							{/if}
						</td>
						<td><span class="sw-mono sw-mute" style="font-size:11px">{tag.slug}</span></td>
						<td><span class="sw-mono sw-mute" style="font-size:11px">{tag.postCount}</span></td>
						<td>
							{#if editingId !== tag.id}
								<div style="display:flex;gap:16px;justify-content:flex-end;">
									<button type="button" onclick={() => startEdit(tag)} class="adm-action primary">Edit</button>
									<form
										method="POST"
										action="?/delete"
										use:enhance={() => {
											return async ({ update }) => {
												if (confirm('Delete this tag?')) await update();
											};
										}}
										style="display:contents"
									>
										<input type="hidden" name="id" value={tag.id} />
										<button type="submit" class="adm-action danger">Delete</button>
									</form>
								</div>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
