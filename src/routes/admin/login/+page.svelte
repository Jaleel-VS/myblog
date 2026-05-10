<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin — Login</title>
</svelte:head>

<div class="adm-login">
	<div class="adm-login-box">
		<h1>Admin<span class="sw-red">.</span></h1>
		<p class="sub">Enter the admin password to continue</p>

		{#if form?.error}
			<div class="adm-alert adm-alert-err">{form.error}</div>
		{/if}

		<form method="POST" action="?/login" use:enhance>
			<div class="adm-field">
				<label for="password" class="adm-label">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					placeholder="••••••••"
					class="adm-input"
				/>
			</div>
			<button type="submit" class="adm-btn adm-btn-ink" style="width:100%">Sign in</button>
		</form>

		<p style="margin-top:24px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.04em;">
			<a href="/" class="adm-action">← Back to site</a>
		</p>
	</div>
</div>
