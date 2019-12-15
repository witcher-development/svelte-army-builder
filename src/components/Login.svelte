<script lang="ts">
	import { navigateTo } from 'svelte-router-spa';
	import { state as characters } from '../store/characters';
	import { login } from '../store/auth';
	import { setLoading } from '../store/loading';

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

		&__button {
			display: none;

			width: 160px;
			height: 43px;

			margin-top: 30px;
			padding: 12px 31px;

			background-image: linear-gradient(180deg, #ededed, #573b23);
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.45);
			border-radius: 6px;

			border: none;

			position: relative;

			&:before {
				content: '';

				position: absolute;
				top: 2px;
				right: 2px;
				bottom: 2px;
				left: 2px;

				border-radius: 6px;
				background-color: #7e5f58;
			}

			&:after {
				content: '';

				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;

				border-radius: 6px;
				background-image: linear-gradient(180deg, #f756fe, #661f91);
			}

			&_inner {
				position: absolute;
				top: 7px;
				right: 7px;
				bottom: 7px;
				left: 7px;
				z-index: 1;

				border-radius: 6px;
				background-image: linear-gradient(to right, #4c0d7a, #b921c4, #4c0d7a);

				&:before {
					content: '';

					position: absolute;
					top: 0;
					left: 0;

					width: 100%;
					height: 100%;

					border-radius: 6px;
					background-image: linear-gradient(
						to right,
						#991db5,
						#e235ee,
						#991db5
					);

					opacity: 0;

					transition: opacity 0.2s;
				}
			}

			&:hover &_inner:before {
				opacity: 1;
			}

			&-text {
				color: #fff;

				position: relative;
				z-index: 10;

				text-transform: uppercase;
				font-weight: 700;
			}

			cursor: pointer;
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

	<button class="login__button">
		<span class="login__button_inner" />
		<span class="login__button-text">Join</span>
	</button>
</div>
