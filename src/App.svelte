<script lang="ts">
	import { onMount } from 'svelte';
	import { Router } from 'svelte-router-spa';

	import { getState as getAuthData } from './store/auth';
	import { state as loading, setLoading } from './store/loading';
	import { fetchClasses } from './store/classes';
	import { fetchCharacters } from './store/characters';

	import Loader from './components/Loader.svelte';
	import Login from './components/Login.svelte';
	import Desk from './components/Desk/index.svelte';

	import logo from 'assets/logo.png';

	onMount(async () => {
		setLoading(true);

		await fetchCharacters();
		await fetchClasses();

		setLoading(false);
	});

	const routes = [
		{
			name: '/',
			component: Desk,
			onlyIf: {
				guard: () => getAuthData().token,
				redirect: '/login',
			},
		},
		{
			name: '/login',
			component: Login,
			onlyIf: {
				guard: () => !getAuthData().token,
				redirect: '/',
			},
		},
	];
</script>

<style type="text/scss">
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;

		height: 100%;

		background-image: url(assets/bgi.jpg);
		background-size: cover;

		position: relative;

		img {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);

			width: 200px;
		}
	}
</style>

<div class="app">
	<img src={logo} alt="logo" />
	{#if $loading}
		<Loader />
	{/if}
	<Router {routes} />
</div>
