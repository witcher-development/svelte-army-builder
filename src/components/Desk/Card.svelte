<script lang="ts">
	import { getClassNameById } from '../../store/classes';
	import { state as player } from '../../store/player';
	import { state as drag } from '../../store/dragDrop';

	export let id;
	export let name;
	export let health;
	export let attack;
	export let manaCost;
	export let image;
	export let text;
	export let flavorText;
	export let rarityId;
	export let classId;

	export let isDeckCard = false;

	let imageVar;
	$: imageVar = `url(${image})`;

	let className;
	$: className = getClassNameById(classId);

	let playerClass;
	$: playerClass = getClassNameById($player.classId);

	let isDragged;
	$: isDragged = !$drag.cardId === id;
</script>

<style type="text/scss">
	@function v($var) {
		@return var(--#{$var});
	}

	.card {
		width: 100%;
		height: 100%;

		&_dragged {
			opacity: 0.6;
		}

		img {
			width: 100%;
			object-fit: contain;
		}

		&__popup {
			position: fixed;
			z-index: 10;
			top: 50%;
			left: 54%;
			transform: translateY(-50%);

			&.left-side {
				left: 7.4%;
			}

			width: 450px;
			height: 700px;

			padding: 25px 20px;

			background-color: rgba(0, 0, 0, 0.9);
			border-radius: 10px;
			box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.8);

			cursor: default;

			&-bgi {
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;

				width: 100%;
				height: 100%;

				opacity: 0.3;

				background-image: v(bgi);
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}

			display: none;
		}

		cursor: pointer;

		&:hover &__popup {
			display: block;
		}

		color: #e0e0e0;

		h3 {
			font-size: 26px;
			text-align: center;
		}

		&_rarity2 {
			h3 {
				color: #bfbfbf;
			}
		}

		&_rarity3 {
			h3 {
				color: #525cc8;
			}
		}

		&_rarity4 {
			h3 {
				color: #8000a3;
			}
		}

		&_rarity5 {
			h3 {
				color: #f57719;
			}
		}

		p,
		li {
			color: #fff;
			font-size: 19px;
			font-weight: 600;
			font-family: Vecna, sans-serif;
		}

		&__stats {
			display: flex;
			justify-content: space-between;

			margin-top: 25px;

			ul {
				margin: 0;
				padding: 0;

				list-style: none;
			}

			&_health span {
				color: #f5000c;
			}

			&_attack span {
				color: #fce100;
			}

			&_mana span {
				color: #4a4dad;
			}
		}

		&__class {
			padding: 4px 10px;

			font-size: 19px;
			font-family: 'Belwe Bold', sans-serif;

			&.hunter {
				color: #8bc951;
			}
			&.druid {
				color: #fe9536;
			}
			&.mage {
				color: #b2dfe9;
			}
		}
	}
</style>

<div
	class="card {rarityId ? `card_rarity${rarityId}` : ''}
	{isDragged ? 'card_dragged' : ''}"
	style="--bgi:{imageVar}"
	data-card-id={id}
	data-deck-card={isDeckCard}>

	{#if !isDragged}
		<div class="card__popup {isDeckCard ? 'left-side' : ''}">
			<div class="card__popup-bgi" />

			<h3>{name}</h3>
			<div class="card__stats">
				<ul>
					<li class="card__stats_health">
						<span>Health</span>
						: {health}
					</li>
					<li class="card__stats_attack">
						<span>Attack</span>
						: {attack}
					</li>
					<li class="card__stats_mana">
						<span>Mana &nbsp;</span>
						: {manaCost}
					</li>
				</ul>
				<h4
					class="card__class {className === playerClass ? className.toLowerCase() : ''}">
					{className}
				</h4>
			</div>

			<p>
				{@html text}
			</p>
			<p>{flavorText}</p>
		</div>
	{/if}

	<img src={image} alt={name} draggable="false" />
</div>
