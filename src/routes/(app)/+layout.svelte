<script lang="ts">
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<main>
	<div class="header">
		<nav>
			<a href="/">Home</a>
			<a href="/about">About</a>
			{#if data.user}
				<a href="/profile">My Profile</a>
			{/if}
		</nav>
		{#if data.user}
			<div class="user">
				<h2>Welcome, {data.user.email}!</h2>
				<form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>
			</div>
		{:else}
			<a href="/signin">Sign in</a>
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

	.user {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	button {
		cursor: pointer;
		font-size: 1rem;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
</style>
