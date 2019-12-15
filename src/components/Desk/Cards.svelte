<script lang="ts">
	import { state as cards } from '../../store/cards';
	import { state as drag } from '../../store/dragDrop';

	import Card from './Card.svelte';
	import Filter from './Filter.svelte';

	let isFilterVisible = false;
	const toggleFilter = () => {
		isFilterVisible = !isFilterVisible;
	};
</script>

<style type="text/scss">
	.cards {
		&_wrapper {
			width: 50%;
			height: 100%;

			padding-right: 130px;
			padding-bottom: 200px;
		}

		width: 100%;

		border-radius: 13px;
		box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.8);

		background-image: url(assets/cards-bgi.jpg);
		background-size: contain;

		position: relative;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			margin-bottom: 20px;
			padding: 0 20px;
		}

		&__title {
			color: #e0e0e0;
			text-align: left;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		}

		&__filter {
			width: 30px;
			height: 30px;

			margin-bottom: -7px;

			background-image: url(assets/filter.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;

			position: relative;

			cursor: pointer;

			&:before {
				content: '';

				display: block;
				width: 100%;
				height: 100%;

				position: absolute;
				transform: scale(2.5);
			}
		}

		&__list {
			display: flex;
			flex-wrap: wrap;

			padding: 37px 30px;

			li {
				width: 130px;
				height: 200px;

				margin-right: 10px;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}

		&__drop-target {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 100;

			width: 100%;
			height: 100%;
		}
	}
</style>

<div class="cards_wrapper">
	<div class="cards__header">
		<h2 class="cards__title">All cards</h2>
		<div class="cards__filter" on:click={toggleFilter} />
	</div>
	<div class="cards">
		<ul class="cards__list">
			{#each $cards as card}
				<li>
					<Card {...card} />
				</li>
			{/each}
		</ul>
		{#if isFilterVisible}
			<Filter />
		{/if}
	</div>
	{#if $drag.dragFromDeck}
		<div class="cards__drop-target" />
	{/if}
</div>
