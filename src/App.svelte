<script lang="ts">
	import { onMount } from 'svelte';
	import { Router, Route, navigate } from 'svelte-routing';

	import Login from './components/Login.svelte';
	import Desk from './components/Desk.svelte';

	import { authStore } from './store';

	import logo from 'assets/logo.png';

	onMount(() => {
		if (!$authStore) {
			navigate('/login');
		}
	});
</script>

<style type="text/scss">
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;

		height: 100%;

		background-image: url(assets/bgi.jpg);
		background-size: cover;

		img {
			width: 200px;
		}
	}
</style>

<div class="app">
	<img src={logo} alt="logo">
	<Router>
		<div>
			<Route path="login" component={Login} />
			<Route path="/" component={Desk} />
		</div>
	</Router>
</div>
