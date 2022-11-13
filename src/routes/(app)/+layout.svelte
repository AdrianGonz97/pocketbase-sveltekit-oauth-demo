<script lang="ts">
	import { browser } from '$app/environment';
	import { generateState, getAuthUrl } from '$lib/utils';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let url = '';
	let state: string;

	if (browser) {
		state = generateState();
		url = getAuthUrl(state).toString();
	}
</script>

<main>
	<div class="header">
		{#if data.user}
			<h2>Welcome, {data.user.email}!</h2>
			<form action="/logout" method="POST">
				<button type="submit">Logout</button>
			</form>
		{:else}
			<a
				href={url}
				on:click={() => {
					window.localStorage.setItem('state', state);
				}}>Connect with Twitch</a
			>
		{/if}
	</div>
	<slot />
</main>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	button {
		cursor: pointer;
		font-size: 1.25rem;
	}
</style>
