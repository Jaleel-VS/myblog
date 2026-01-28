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
	<title>Manage Tags</title>
</svelte:head>

<div class="px-4 sm:px-0">
	<h1 class="text-3xl font-bold text-gray-900 mb-8">Tags</h1>

	{#if form?.error}
		<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
			<p class="text-red-700">{form.error}</p>
		</div>
	{/if}

	{#if form?.success}
		<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
			<p class="text-green-700">Tag saved successfully!</p>
		</div>
	{/if}

	<div class="bg-white shadow rounded-lg p-6 mb-8">
		<h2 class="text-lg font-medium text-gray-900 mb-4">Add New Tag</h2>
		<form method="POST" action="?/create" use:enhance class="flex gap-4">
			<input
				type="text"
				name="name"
				placeholder="Tag name"
				required
				class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
			<button
				type="submit"
				class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
			>
				Add Tag
			</button>
		</form>
	</div>

	{#if data.tags.length === 0}
		<div class="text-center py-12 bg-white rounded-lg shadow">
			<p class="text-gray-500 text-lg">No tags yet.</p>
			<p class="text-gray-400 mt-2">Create your first tag using the form above.</p>
		</div>
	{:else}
		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Name
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Slug
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Posts
						</th>
						<th scope="col" class="relative px-6 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each data.tags as tag (tag.id)}
						<tr>
							<td class="px-6 py-4">
								{#if editingId === tag.id}
									<form method="POST" action="?/update" use:enhance class="flex gap-2">
										<input type="hidden" name="id" value={tag.id} />
										<input
											type="text"
											name="name"
											bind:value={editingName}
											required
											class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
										/>
										<button
											type="submit"
											class="text-green-600 hover:text-green-900 text-sm font-medium"
										>
											Save
										</button>
										<button
											type="button"
											onclick={cancelEdit}
											class="text-gray-600 hover:text-gray-900 text-sm font-medium"
										>
											Cancel
										</button>
									</form>
								{:else}
									<span class="text-sm font-medium text-gray-900">{tag.name}</span>
								{/if}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{tag.slug}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{tag.postCount}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
								{#if editingId !== tag.id}
									<button
										type="button"
										onclick={() => startEdit(tag)}
										class="text-blue-600 hover:text-blue-900"
									>
										Edit
									</button>
									<form
										method="POST"
										action="?/delete"
										use:enhance={() => {
											return async ({ update }) => {
												if (confirm('Are you sure you want to delete this tag?')) {
													await update();
												}
											};
										}}
										class="inline"
									>
										<input type="hidden" name="id" value={tag.id} />
										<button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
									</form>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
