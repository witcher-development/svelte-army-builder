<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	// @ts-ignore
	import bgi from './assets/bgi.jpg';
	import myStore from './store';

	const name: string = 'test';

	onMount(() => {
		console.log('App mounted');
	});
</script>

<style type="text/scss">
	.app {
		/*background-image: url(../);*/
	}

	h1 {
		color: #fff;
	}
</style>

<div class="app">
	<img src={bgi} alt="" />
	<h1>Hello {name}!</h1>
</div>
