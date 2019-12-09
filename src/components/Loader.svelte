<script>
	import { onMount } from 'svelte';
	import loader from 'assets/loader.gif';

	let visible = false;

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 1);

		return () => {
			visible = false;
		};
	});
</script>

<style type="text/scss">
	.loader {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 100;

		background-color: #00070c;
		opacity: 0;

		transition: opacity 0.2s;

		img {
			position: absolute;
			top: 50%;
			left: 50%;

			transform: translate(-50%, -50%) scale(0.7);
		}

		&_active {
			composes: loader;
			opacity: 0.7;
		}
	}
</style>

<div class="loader" class:loader_active={visible}>
	<img src={loader} alt="loader" />
</div>
