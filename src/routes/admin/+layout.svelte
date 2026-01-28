<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/admin" class="text-xl font-bold text-gray-900">Admin</a>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<a
							href="/admin"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Dashboard
						</a>
						<a
							href="/admin/posts"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Posts
						</a>
						<a
							href="/admin/tags"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Tags
						</a>
					</div>
				</div>
				<div class="flex items-center gap-4">
					<a
						href="/blog"
						class="text-gray-500 hover:text-gray-700 text-sm font-medium"
						target="_blank"
					>
						View Blog &rarr;
					</a>
					<form method="POST" action="/admin/login?/logout">
						<button
							type="submit"
							class="text-gray-500 hover:text-gray-700 text-sm font-medium"
						>
							Logout
						</button>
					</form>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
