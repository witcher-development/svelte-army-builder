<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { Router, navigateTo } from 'svelte-router-spa';

	import Loader from './components/Loader.svelte';
	import Login from './components/Login.svelte';
	import Desk from './components/Desk.svelte';

	import { authStore, loadingStore } from './store';

	import logo from 'assets/logo.png';

	const routes = [
		{
			name: '/',
			component: Desk,
			onlyIf: {
				guard: () => {
					console.log('desk guard', get(authStore).token);
					return get(authStore).token;
				},
				redirect: '/login',
			},
		},
		{
			name: '/login',
			component: Login,
			onlyIf: {
				guard: () => {
					console.log('login guard', !get(authStore).token);
					return !get(authStore).token;
				},
				redirect: '/',
			},
		},
	];

	// onMount(() => {
	// 	if (!$authStore) {
	// 		navigateTo('/login');
	// 	}
	// });
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
  {#if $loadingStore}
		<Loader />
  {/if}
	<Router {routes} />
</div>
