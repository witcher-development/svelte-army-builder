<script lang="ts">
	import { Router } from 'svelte-router-spa';

	import { state as loading } from './store/loading';
	import { state as auth } from './store/auth';

	import Loader from './components/Loader.svelte';
	import Login from './components/Login.svelte';
	import Desk from './components/Desk/index.svelte';

	import logo from 'assets/logo.png';

	const routes = [
		{
			name: '/',
			component: Desk,
			onlyIf: {
				guard: () => $auth.token,
				redirect: '/login',
			},
		},
		{
			name: '/login',
			component: Login,
			onlyIf: {
				guard: () => !$auth.token,
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
