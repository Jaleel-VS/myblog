<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin Login</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Admin Login</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Enter the admin password to continue
			</p>
		</div>

		{#if form?.error}
			<div class="p-4 bg-red-50 border border-red-200 rounded-md">
				<p class="text-red-700 text-sm text-center">{form.error}</p>
			</div>
		{/if}

		<form method="POST" action="?/login" use:enhance class="mt-8 space-y-6">
			<div>
				<label for="password" class="sr-only">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
					placeholder="Password"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Sign in
				</button>
			</div>
		</form>

		<p class="text-center text-sm text-gray-500">
			<a href="/" class="text-blue-600 hover:text-blue-800">Back to site</a>
		</p>
	</div>
</div>
