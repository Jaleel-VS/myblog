<script lang="ts">
	import './layout.css';
	import type { Snippet } from 'svelte';
	import { browser } from '$app/environment';

	let { children }: { children: Snippet } = $props();

	let dark = $state(false);

	if (browser) {
		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const isDark = stored ? stored === 'dark' : prefersDark;
		dark = isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}

	function toggleTheme() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
	<!-- Prevent flash of wrong theme -->
	<script>
		(function () {
			try {
				var t = localStorage.getItem('theme');
				var d = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
				document.documentElement.classList.toggle('dark', d);
			} catch (e) {}
		})();
	</script>
</svelte:head>

<div class="sw-wrap">
	<header class="sw-topbar">
		<div class="sw-topbar-l">
			<a href="https://jaleel.co.za" class="sw-mono" style="font-size:11px;letter-spacing:.06em;text-transform:uppercase">
				Jaleel <span class="sw-red">/</span> Writing
			</a>
		</div>
		<div class="sw-topbar-c">— jaleel.co.za —</div>
		<nav class="sw-topbar-r">
			<a href="/">Home</a>
			<a href="/blog">All posts</a>
			<button onclick={toggleTheme} class="sw-mute" aria-label="Toggle theme">
				{dark ? 'light' : 'dark'}
			</button>
		</nav>
	</header>

	{@render children()}

	<footer class="sw-footer">
		<span>© JD van Staden, {new Date().getFullYear()}</span>
		<span style="text-align:center">Set in Space Grotesk &amp; JetBrains Mono</span>
		<span style="text-align:right">Cape Town &nbsp;·&nbsp; built quietly</span>
	</footer>
</div>
