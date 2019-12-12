<script lang="ts">
	import { onMount } from 'svelte';
	import { getCards } from '../../client';
	import {
		setLoading,
		setCards,
		dragStore,
		dragNodeCoorsStore,
		getCardImageById,
	} from '../../store';
	import {
		setDragDropHandlers,
		removeDragDropHandlers,
	} from '../../dragDropBus';

	import Header from './Header.svelte';
	import Cards from './Cards.svelte';
	import Deck from './Deck.svelte';

	onMount(async () => {
		setLoading(true);

		const cards = await getCards();
		setCards(cards.data.cards);

		setLoading(false);

		setDragDropHandlers();

		return () => {
			removeDragDropHandlers();
		};
	});

	let imageVar;
	$: imageVar = $dragStore.isDragOn
		? `url(${getCardImageById($dragStore.cardId)})`
		: '';
</script>

<style type="text/scss">
	@function v($var) {
		@return var(--#{$var});
	}

	.desk {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		height: 100%;

		&_inner {
			display: flex;
			justify-content: space-between;

			max-width: 1200px;
			width: 100%;
			height: 100%;

			padding: 35px 0 0;
		}

		&__drag {
			position: fixed;
			transform: translate(-50%, -50%);

			width: 100px;
			height: 150px;

			background-image: v(bgi);
			background-size: contain;
			background-repeat: no-repeat;

			cursor: grabbing;

			&:before {
				content: '';

				display: block;

				width: 100%;
				height: 100%;

				transform: scale(0.8);
				box-shadow: 0 7px 15px 15px rgba(0, 0, 0, 0.5);

				border-radius: 10px;
			}
		}
	}
</style>

<div class="desk">
	<Header />

	<div class="desk_inner">
		<Cards />
		<Deck />
	</div>

	{#if $dragStore.isDragOn}
		<div
			class="desk__drag"
			style="--bgi:{imageVar}; top: {$dragNodeCoorsStore.y}px; left: {$dragNodeCoorsStore.x}px;" />
	{/if}
</div>
