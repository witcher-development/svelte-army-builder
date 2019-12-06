<script lang="ts">
	import { onMount } from 'svelte';
	import { Router, navigateTo } from 'svelte-router-spa';

	import Login from './components/Login.svelte';
	import Desk from './components/Desk.svelte';

	import { authStore } from './store';

	import logo from 'assets/logo.png';

	const routes = [
		{
			name: '/login',
			component: Desk,
			onlyIf: {
				guard: () => {
					return $authStore.auth;
				},
				redirect: '/login',
			},
		},
		{
			name: '/',
			component: Login,
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
			width: 200px;
		}
	}
</style>

<div class="app">
	<img src={logo} alt="logo" />
	<Router {routes} />
</div>
