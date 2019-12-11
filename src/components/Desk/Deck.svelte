<script lang="ts">
	import { Player } from '../../types';
	import { playerStore, setDeck, dragStore, cardsStore } from '../../store';

	import Card from './Card.svelte';

	const alwaysGet4Cards = (store: Player) => {
		const storeDeck = store.deck;
		return [
			...storeDeck,
			...[...Array(4 - storeDeck.length)].map(() => ({ id: 0 })),
		];
	};

	let deck = alwaysGet4Cards($playerStore);
	$: deck = alwaysGet4Cards($playerStore);

	const onMouseUp = (index: number) => {
		console.log('fired');

		const cardId = $dragStore.cardId;
		const card = $cardsStore.find(({ id }) => cardId === id);
		deck[index] = card || { id: 0 };

		setDeck(deck);
	};
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
		}
	}
</style>

<div class="deck_wrapper">
	<h2 class="deck__title">Your deck</h2>
	<div class="deck">
		<ul class="deck__list">
			{#each deck as card, i}
				<li class="deck__card" on:mouseup={() => onMouseUp(i)}>
					{#if card.id !== 0}
						<Card {...card} isDeckCard />
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
