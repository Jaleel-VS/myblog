<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin Dashboard</title>
</svelte:head>

<div class="px-4 sm:px-0">
	<h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		<div class="bg-white overflow-hidden shadow rounded-lg">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
							<span class="text-blue-600 text-xl">&#128221;</span>
						</div>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
							<dd class="text-3xl font-semibold text-gray-900">{data.stats.totalPosts}</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white overflow-hidden shadow rounded-lg">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
							<span class="text-green-600 text-xl">&#10003;</span>
						</div>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Published</dt>
							<dd class="text-3xl font-semibold text-gray-900">{data.stats.publishedPosts}</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white overflow-hidden shadow rounded-lg">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-yellow-100 rounded-md flex items-center justify-center">
							<span class="text-yellow-600 text-xl">&#128394;</span>
						</div>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Drafts</dt>
							<dd class="text-3xl font-semibold text-gray-900">{data.stats.draftPosts}</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white overflow-hidden shadow rounded-lg">
			<div class="p-5">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center">
							<span class="text-purple-600 text-xl">&#127991;</span>
						</div>
					</div>
					<div class="ml-5 w-0 flex-1">
						<dl>
							<dt class="text-sm font-medium text-gray-500 truncate">Tags</dt>
							<dd class="text-3xl font-semibold text-gray-900">{data.stats.totalTags}</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-8 flex gap-4">
		<a
			href="/admin/posts/new"
			class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
		>
			New Post
		</a>
		<a
			href="/admin/posts"
			class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
		>
			Manage Posts
		</a>
	</div>
</div>
