<script lang="ts">
	import { onMount } from 'svelte';
	import { navigateTo } from 'svelte-router-spa';

	import { state as characters, fetchCharacters } from '../store/characters';
	import { login } from '../store/auth';
	import { setLoading } from '../store/loading';

	onMount(async () => {
		setLoading(true);

		await fetchCharacters();

		setLoading(false);
	});

	const onClickHero = async (id: number) => {
		setLoading(true);
		const response = await login(id);

		if (response) {
			navigateTo('/');
		} else {
			alert('Error')
		}
	};
</script>

<style type="text/scss">
	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 100%;

		h1 {
			margin-bottom: 50px;

			color: #fff;
			font-size: 45px;
			font-weight: 300;
		}

		&__characters {
			display: flex;
			justify-content: center;
			align-items: center;

			padding: 0;

			list-style: none;
		}

		&__character {
			margin: 0 20px;

			border-radius: 50%;

			cursor: pointer;
			transition: box-shadow 0.4s;

			img {
				width: 100%;
				transition: transform 0.2s;
			}

			p {
				margin-top: -28px;

				font-size: 30px;
				color: #fff;
				text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
				text-align: center;

				transition: transform 0.2s;
			}

			&:hover {
				box-shadow: 0 0 110px 10px #fff, inset 0 0 89px -11px #fff;

				img {
					transform: scale(1.2);
				}

				p {
					transform: translateY(-200px);
				}
			}
		}
	}
</style>

<div class="login">
	<h1>Choose a hero</h1>
	<ul class="login__characters">
		{#each $characters as { id, name, image }}
			<li class="login__character" on:click={() => onClickHero(id)}>
				<img src={image} alt={name} />
				<p>{name}</p>
			</li>
		{/each}
	</ul>
</div>
