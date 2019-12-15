<script lang="ts">
	import { onMount } from 'svelte';

	import { setLoading } from '../../store/loading';
	import { fetchCards, getCardImageById } from '../../store/cards';
	import { fetchPlayer } from '../../store/player';
	import { fetchDeck } from '../../store/deck';

	import { state as drag } from '../../store/dragDrop';
	import { state as dragNode } from '../../store/dragNode';

	import {
		setDragDropHandlers,
		removeDragDropHandlers,
	} from '../../dragDropBus';

	import Header from './Header.svelte';
	import Cards from './Cards.svelte';
	import Deck from './Deck.svelte';

	onMount(async () => {
		setLoading(true);

		await fetchCards();
		await fetchPlayer();
		await fetchDeck();

		setLoading(false);

		setDragDropHandlers();

		return () => {
			removeDragDropHandlers();
		};
	});

	let imageVar;
	$: imageVar = $drag.isDragOn ? `url(${getCardImageById($drag.cardId)})` : '';

	let style = `--bgi:${imageVar}; top: ${$dragNode.y}px; left: ${$dragNode.x}px;`;
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

	{#if $drag.isDragOn}
		<div class="desk__drag" {style} />
	{/if}
</div>
