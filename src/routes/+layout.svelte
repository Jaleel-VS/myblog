<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="layout">
	<header>
		<nav>
			<a href="/" class="logo">blog.</a>
			<div class="nav-links">
				<a href="/blog">Writing</a>
			</div>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<span>&copy; {new Date().getFullYear()}</span>
	</footer>
</div>

<style>
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid #eee;
	}

	nav {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.25rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		color: #000;
		text-decoration: none;
		letter-spacing: -0.02em;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		font-family: 'Inter', sans-serif;
		font-size: 0.875rem;
		color: #666;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.nav-links a:hover {
		color: #000;
	}

	main {
		flex: 1;
		margin-top: 4rem;
	}

	footer {
		padding: 3rem 2rem;
		text-align: center;
		font-family: 'Inter', sans-serif;
		font-size: 0.75rem;
		color: #999;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
</style>
