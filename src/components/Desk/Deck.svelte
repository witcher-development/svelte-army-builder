<script lang="ts">
	import { playerStore, dragStore } from '../../store/store';
	import Card from './Card.svelte';
</script>

<style type="text/scss">
	.deck {
		&_wrapper {
			width: 50%;
		}

		width: 100%;
		height: 348px;

		padding: 57px 36px 25px;

		border-radius: 13px;
		box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.8);

		background-image: url(assets/board.png);
		background-size: contain;
		background-repeat: no-repeat;

		&__title {
			margin-bottom: 20px;
			padding-right: 20px;

			color: #e0e0e0;
			text-align: right;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		}

		&__list {
			display: flex;
			justify-content: space-between;

			padding: 0 42px 0 36px;

			list-style: none;
		}

		&__card {
			width: 106px;
			height: 159px;

			position: relative;

			&-drop-target {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 100;

				width: 100%;
				height: 100%;
			}
		}
	}
</style>

<div class="deck_wrapper">
	<h2 class="deck__title">Your deck</h2>
	<div class="deck">
		<ul class="deck__list">
			{#each $playerStore.deck as card, i}
				<li class="deck__card">
					{#if card}
						<Card {...card} isDeckCard />
					{/if}
					{#if $dragStore.isDragOn}
						<div class="deck__card-drop-target" data-deck-index={i}></div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
