<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { LightPaginationNav } from 'svelte-paginate';

	import { state, setCurrent } from '../../store/pagination';

	const dispatch = createEventDispatcher();

	const onChange = (page) => {
		setCurrent(page);
		dispatch('change');
	}
</script>

<style type="text/scss">
	.navigation :global(.pagination-nav) {
		background-color: transparent;
	}
	.navigation :global(.option) {
		color: #fff;
		font-size: 22px;

		&:hover {
			background-color: transparent;
			color: #269dd9;
		}
	}
	.navigation :global(.option svg path) {
		fill: #fff;
	}
	.navigation :global(.option:hover svg path) {
		fill: #269dd9;
	}
</style>

<div class="navigation">
	<LightPaginationNav
		totalItems={$state.total}
		currentPage={$state.current}
		limit={1}
		showStepOptions={true}
		on:setPage={(e) => onChange(e.detail.page)} />
</div>
