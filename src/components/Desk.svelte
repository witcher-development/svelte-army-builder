<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Desk mounted');

		return () => {
			console.log('Desk unmounted');
		}
	});
</script>

<h1>Desk</h1>
