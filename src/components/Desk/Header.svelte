<script lang="ts">
	import { tick } from 'svelte';
	import { get } from 'svelte/store';
	import { navigateTo } from 'svelte-router-spa';
	import { logout, playerStore, getClassNameById, getCharacterNameById } from '../../store';

	const onClickLogout = () => {
		logout();
		navigateTo('/login');
	};

	let name;
	$: name = getCharacterNameById(get(playerStore).characterId);

	let className;
	$: className = getClassNameById(get(playerStore).classId);

</script>

<style type="text/scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		height: 100px;

		padding: 0 40px 25px;

		p {
			margin-top: 23px;

			color: #e0e0e0;
			font-size: 23px;

			span {
				&.hunter {
					color: #8BC951;
				}
				&.druid {
					color: #FE9536;
				}
				&.mage {
					color: #B2DFE9;
				}
			}
		}

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
	<p>
    {name}:
		<span class={className.toLowerCase()}>{className}</span>
	</p>
	<a on:click|preventDefault={onClickLogout}>logout</a>
</header>
