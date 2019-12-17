<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { state, getState, setFiled, clearFields } from '../../store/filter';

	import Field from './DragField.svelte';

	const onChange = (field, option) => {
		setFiled(field, option.detail);
	};

	let filters;
	state.subscribe(() => {
		filters = getState();
	});

	const dispatch = createEventDispatcher();
</script>

<style type="text/scss">
	.filter {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		padding: 30px;

		border-radius: 13px;
		background-color: rgba(0, 0, 0, 0.7);

		&__apply {
			width: 160px;
			height: 43px;

			margin-top: 30px;
			padding: 12px 31px;

			background-image: linear-gradient(180deg, #ededed, #573b23);
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.45);
			border-radius: 6px;

			border: none;

			position: relative;

			&:before {
				content: '';

				position: absolute;
				top: 2px;
				right: 2px;
				bottom: 2px;
				left: 2px;

				border-radius: 6px;
				background-color: #7e5f58;
			}

			&:after {
				content: '';

				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;

				border-radius: 6px;
				background-image: linear-gradient(180deg, #f756fe, #661f91);
			}

			&_inner {
				position: absolute;
				top: 7px;
				right: 7px;
				bottom: 7px;
				left: 7px;
				z-index: 1;

				border-radius: 6px;
				background-image: linear-gradient(to right, #4c0d7a, #b921c4, #4c0d7a);

				&:before {
					content: '';

					position: absolute;
					top: 0;
					left: 0;

					width: 100%;
					height: 100%;

					border-radius: 6px;
					background-image: linear-gradient(
						to right,
						#991db5,
						#e235ee,
						#991db5
					);

					opacity: 0;

					transition: opacity 0.2s;
				}
			}

			&:hover &_inner:before {
				opacity: 1;
			}

			&-text {
				color: #fff;

				position: relative;
				z-index: 10;

				text-transform: uppercase;
				font-weight: 700;
			}

			cursor: pointer;

			&_clear {
				margin-left: 20px;
			}
		}
	}
</style>

<div class="filter">
	{#each filters as field}
		<Field
			title={field.name}
			{...field}
			on:change={(option) => onChange(field.name, option)} />
	{/each}
	<button class="filter__apply" on:click={() => dispatch('apply')}>
		<span class="filter__apply_inner" />
		<span class="filter__apply-text">Apply</span>
	</button>
	<button class="filter__apply filter__apply_clear" on:click={clearFields}>
		<span class="filter__apply_inner" />
		<span class="filter__apply-text">Clear all</span>
	</button>
</div>
