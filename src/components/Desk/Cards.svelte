<script lang="ts">
	import { get } from 'svelte/store';
	import { cardsStore } from '../../store';
	import Card from './Card.svelte';

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

		&__title {
			margin-bottom: 20px;
			padding-left: 20px;

			color: #e0e0e0;
			text-align: left;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
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
	}
</style>

<div class="cards_wrapper">
	<h2 class="cards__title">All cards</h2>
	<div class="cards">
		<ul class="cards__list">
			{#each $cardsStore as card}
				<li>
					<Card {...card} />
				</li>
			{/each}
		</ul>
	</div>
</div>
