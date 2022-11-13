<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data;
</script>

<h1>Welcome to your profile!</h1>
<p>Email: {user.email}</p>
<p>ID: {user.id}</p>
