<script lang="ts">
	import { navigateTo } from 'svelte-router-spa';

	import { logout } from '../../store/auth';
	import { getState as getPlayer } from '../../store/player'
	import { getClassNameById } from '../../store/classes';
	import { getCharacterNameById } from '../../store/characters';

	const onClickLogout = () => {
		logout();
		navigateTo('/login');
	};

	let name;
	$: name = getCharacterNameById(getPlayer().characterId);

	let className;
	$: className = getClassNameById(getPlayer().classId);

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
