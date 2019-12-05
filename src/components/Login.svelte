<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Login mounted');

		return () => {
			console.log('Login unmounted');
		}
	});
</script>

<h1>Login</h1>
