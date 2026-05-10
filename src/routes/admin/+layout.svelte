<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	let { children }: { children: Snippet } = $props();

	const isActive = (path: string) => $page.url.pathname === path || ($page.url.pathname.startsWith(path + '/') && path !== '/admin');
</script>

<div style="padding-top: 24px">
	<nav class="adm-nav">
		<a href="/admin"        class="adm-nav-link" class:active={$page.url.pathname === '/admin'}>Dashboard</a>
		<a href="/admin/posts"  class="adm-nav-link" class:active={isActive('/admin/posts')}>Posts</a>
		<a href="/admin/tags"   class="adm-nav-link" class:active={isActive('/admin/tags')}>Tags</a>
		<div class="adm-nav-right">
			<a href="/blog" target="_blank" class="adm-nav-link">View blog →</a>
			<form method="POST" action="/admin/login?/logout">
				<button type="submit" class="adm-nav-link danger">Logout</button>
			</form>
		</div>
	</nav>

	{@render children()}
</div>
