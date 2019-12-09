<script lang="ts">
	import { tick } from 'svelte';
	import { get } from 'svelte/store';
	import { navigateTo } from 'svelte-router-spa';
	import { logout, playerStore, getClassNameById } from '../../store';

	const onClickLogout = () => {
		logout();
		navigateTo('/login');
	};

	let name;

</script>

<style type="text/scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		height: 100px;

		padding: 0 40px 25px;

		a {
			color: #616161;
			font-size: 19px;

			transition: color 0.1s;
			position: relative;

			cursor: pointer;

			&:hover {
				color: #d32f2f;
			}

			&:before {
				content: '';

				display: block;
				width: 100%;
				height: 100%;

				position: absolute;
				transform: scale(2);
			}
		}
	}
</style>

<header class="header">
	<p>{get(playerStore).name}: {getClassNameById(get(playerStore).classId)}</p>
	<a on:click|preventDefault={onClickLogout}>logout</a>
</header>
