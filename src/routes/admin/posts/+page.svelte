<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDateShort } from '$lib';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Manage Posts</title>
</svelte:head>

<div class="px-4 sm:px-0">
	<div class="sm:flex sm:items-center sm:justify-between mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Posts</h1>
		<a
			href="/admin/posts/new"
			class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
		>
			New Post
		</a>
	</div>

	{#if data.posts.length === 0}
		<div class="text-center py-12 bg-white rounded-lg shadow">
			<p class="text-gray-500 text-lg">No posts yet.</p>
			<a href="/admin/posts/new" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
				Create your first post
			</a>
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
							Title
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Status
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Tags
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Date
						</th>
						<th scope="col" class="relative px-6 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each data.posts as post (post.id)}
						<tr>
							<td class="px-6 py-4">
								<div class="text-sm font-medium text-gray-900">{post.title}</div>
								<div class="text-sm text-gray-500">/blog/{post.slug}</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								{#if post.published}
									<span
										class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
									>
										Published
									</span>
								{:else}
									<span
										class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
									>
										Draft
									</span>
								{/if}
							</td>
							<td class="px-6 py-4">
								<div class="flex flex-wrap gap-1">
									{#each post.tags as tag (tag.id)}
										<span class="text-xs px-2 py-1 bg-gray-100 rounded">{tag.name}</span>
									{/each}
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatDateShort(post.createdAt)}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
								{#if post.published}
									<a
										href="/blog/{post.slug}"
										target="_blank"
										class="text-gray-600 hover:text-gray-900"
									>
										View
									</a>
								{/if}
								<a href="/admin/posts/{post.id}/edit" class="text-blue-600 hover:text-blue-900">
									Edit
								</a>
								<form method="POST" action="?/togglePublish" use:enhance class="inline">
									<input type="hidden" name="id" value={post.id} />
									<button type="submit" class="text-yellow-600 hover:text-yellow-900">
										{post.published ? 'Unpublish' : 'Publish'}
									</button>
								</form>
								<form
									method="POST"
									action="?/delete"
									use:enhance={() => {
										return async ({ update }) => {
											if (confirm('Are you sure you want to delete this post?')) {
												await update();
											}
										};
									}}
									class="inline"
								>
									<input type="hidden" name="id" value={post.id} />
									<button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
