<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_TWITCH_CLIENT_ID, PUBLIC_TWITCH_REDIRECT_URI } from '$env/static/public';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let url = new URL('https://id.twitch.tv/oauth2/authorize');
	let state: string;

	if (browser) {
		const scopes = ['user:read:email'];
		state = generateState();
		url.searchParams.set('client_id', PUBLIC_TWITCH_CLIENT_ID);
		url.searchParams.set('redirect_uri', PUBLIC_TWITCH_REDIRECT_URI);
		url.searchParams.set('response_type', 'code');
		url.searchParams.set('scope', scopes.join('+'));
		url.searchParams.set('state', state);
	}

	function generateState() {
		const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		let array = new Uint8Array(43);

		window.crypto.getRandomValues(array);
		array = array.map((x) => validChars.charCodeAt(x % validChars.length));

		// @ts-ignore
		const randomState = String.fromCharCode.apply(null, array);

		return randomState;
	}
</script>

<main>
	{#if data.user}
		<h2>Welcome, {data.user.id}!</h2>
		<form action="/logout" method="POST">
			<button type="submit">Logout</button>
		</form>
	{:else}
		<a
			href={url.toString()}
			on:click={() => {
				window.localStorage.setItem('state', state);
			}}>Connect with Twitch</a
		>
	{/if}
	<slot />
</main>
