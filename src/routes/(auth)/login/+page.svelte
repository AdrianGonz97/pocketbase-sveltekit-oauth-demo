<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	export let data: PageData;

	if (browser) {
		handleLogin();
	}

	async function handleLogin() {
		if (data.state !== localStorage.getItem('state')) {
			window.location.href = '/';
			console.error('invalid state');
			return;
		}

		const pee = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({ code: data.code, state: data.state }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		window.location.href = '/';
	}
</script>

<h1>Authorizing...</h1>
