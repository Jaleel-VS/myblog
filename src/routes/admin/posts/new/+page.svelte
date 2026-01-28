<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>New Post</title>
</svelte:head>

<div class="px-4 sm:px-0">
	<div class="mb-8">
		<a href="/admin/posts" class="text-blue-600 hover:text-blue-800">&larr; Back to posts</a>
	</div>

	<h1 class="text-3xl font-bold text-gray-900 mb-8">New Post</h1>

	{#if form?.error}
		<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
			<p class="text-red-700">{form.error}</p>
		</div>
	{/if}

	<form method="POST" use:enhance class="space-y-6 bg-white shadow rounded-lg p-6">
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				value={form?.title ?? ''}
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="excerpt" class="block text-sm font-medium text-gray-700">
				Excerpt <span class="text-gray-400">(optional, auto-generated if empty)</span>
			</label>
			<input
				type="text"
				name="excerpt"
				id="excerpt"
				value={form?.excerpt ?? ''}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="content" class="block text-sm font-medium text-gray-700">
				Content <span class="text-gray-400">(Markdown supported)</span>
			</label>
			<textarea
				name="content"
				id="content"
				rows="15"
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
				>{form?.content ?? ''}</textarea
			>
		</div>

		{#if data.tags.length > 0}
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
				<div class="flex flex-wrap gap-3">
					{#each data.tags as tag (tag.id)}
						<label class="inline-flex items-center">
							<input
								type="checkbox"
								name="tags"
								value={tag.id}
								class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span class="ml-2 text-sm text-gray-700">{tag.name}</span>
						</label>
					{/each}
				</div>
			</div>
		{/if}

		<div class="flex items-center">
			<input
				type="checkbox"
				name="published"
				id="published"
				class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
			/>
			<label for="published" class="ml-2 text-sm text-gray-700">Publish immediately</label>
		</div>

		<div class="flex justify-end gap-4">
			<a
				href="/admin/posts"
				class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
			>
				Cancel
			</a>
			<button
				type="submit"
				class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				Create Post
			</button>
		</div>
	</form>
</div>
