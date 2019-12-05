<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Router, Link, Route, navigate } from 'svelte-routing';
	import bgi from 'assets/bgi.jpg';

	import Login from './components/Login.svelte';
	import Desk from './components/Desk.svelte';

	import myStore from './store';

	const name: string = 'test';

	onMount(() => {
		console.log('App mounted');
	});

	const login = () => {
		navigate('/');
	};
</script>

<style type="text/scss">
	.app {
		height: 100%;

		background-image: url(assets/bgi.jpg);
		background-size: cover;
		h1 {
			color: #fff;
		}
	}
</style>

<div class="app">
	<div>
		<h1>Hello {name}!</h1>
		<button on:click={login}>Log in</button>
	</div>
	<Router>
		<nav>
			<Link to="/">Home</Link>
			<Link to="login">login</Link>
		</nav>
		<div>
			<Route path="login" component={Login} />
			<Route path="/" component={Desk} />
		</div>
	</Router>
</div>
