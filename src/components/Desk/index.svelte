<script lang="ts">
	import { onMount } from 'svelte';
	import { getCards } from '../../client';
	import { setLoading, setCards } from '../../store';

	import Header from './Header.svelte';
	import Cards from './Cards.svelte';
	import Deck from './Deck.svelte';

	onMount(async () => {
		setLoading(true);

		const cards = await getCards();
		setCards(cards.data.cards);

		setLoading(false);

		return () => {};
	});
</script>

<style type="text/scss">
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
	}
</style>

<div class="desk">
	<Header />

	<div class="desk_inner">
		<Cards />
		<Deck />
	</div>
</div>
