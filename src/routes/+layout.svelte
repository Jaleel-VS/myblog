<script lang="ts">
	import './layout.css';
	import type { Snippet } from 'svelte';
	import { browser } from '$app/environment';

	let { children }: { children: Snippet } = $props();
	let dark = $state(false);

	if (browser) {
		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const initialDark = stored ? stored === 'dark' : prefersDark;
		dark = initialDark;
		document.documentElement.classList.toggle('dark', initialDark);
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
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
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

<div class="site-shell">
	<header class="site-header">
		<a class="wordmark" href="https://jaleel.me" aria-label="JD van Staden, portfolio">JD</a>
		<nav aria-label="Primary navigation">
			<a href="https://jaleel.me">Portfolio</a>
			<a href="/">Writing</a>
			<a href="/blog">Archive</a>
			<button
			type="button"
			onclick={toggleTheme}
			class="theme-toggle"
			aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
			title={`Switch to ${dark ? 'light' : 'dark'} mode`}
		>
			{dark ? '○' : '●'}
		</button>
		</nav>
	</header>

	{@render children()}

	<footer class="site-footer">
		<span>JD van Staden</span>
		<span>Cape Town · {new Date().getFullYear()}</span>
	</footer>
</div>
