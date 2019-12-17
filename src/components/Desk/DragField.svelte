<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title;
	export let options;
	export let current;
	export let color;

	const changeValue = createEventDispatcher();

	const onChange = (option) => {
		changeValue('change', option);
	};

	let progress;
	const setProgress = (current) => {
		if (!current) return 0;

		const { value } = current;
		const index = options.findIndex((option) => option.value === value);
		return (100 / (options.length - 1)) * index;
	};
	$: progress = setProgress(current);
</script>

<style type="text/scss">
	.field {
		display: inline-block;

		margin-bottom: 30px;
		color: #fff;

		position: relative;

		&__header {
			display: flex;

			margin-bottom: 15px;
		}

		&__title {
			font-size: 19px;
			text-transform: capitalize;
		}

		&__clear {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 50px;
			height: 21px;

			margin-left: 20px;

			font-size: 11px;

			cursor: pointer;
		}

		&__slider {
			width: 250px;
			height: 12px;

			position: relative;
		}

		&__line,
		&__progress {
			position: absolute;
			top: 3px;
			left: 0;

			width: 100%;
			height: 6px;

			border-radius: 3px;
			border: 1px solid;
			background-color: rgba(189, 189, 189, 0.3);
		}

		&__dots {
			display: flex;
			justify-content: space-between;
			align-items: center;

			width: 100%;
			height: 100%;

			margin: 0;
			padding: 0;

			list-style: none;

			position: relative;
			z-index: 1;
		}

		&__dot {
			width: 12px;
			height: 12px;

			border-radius: 50%;

			position: relative;

			transition: box-shadow 0.1s;
			cursor: pointer;
			&:hover {
				box-shadow: 0 0 10px 6px #fff;
			}

			&_current {
				&:before {
					content: '';

					display: block;
					width: 100%;
					height: 100%;

					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%) scale(1.7);
					z-index: -1;

					border-radius: 50%;
					background-color: #fff;
				}
			}
		}

		&__value {
			position: absolute;
			left: calc(100% + 25px);
			bottom: -5px;

			font-size: 23px;
		}
	}
</style>

<div class="field">
	<div class="field__header">
		<p class="field__title">{title}</p>
		<button class="field__clear" on:click={() => onChange(null)}>Clear</button>
	</div>
	<div class="field__slider">
		<div class="field__line" style="border-color: {color}" />
		<div
			class="field__progress"
			style="background-color: {color}; border-color: {color}; width: {progress}%" />
		<ul class="field__dots">
			{#each options as option}
				<li
					class="field__dot {current && option.value === current.value && 'field__dot_current'}"
					style="background-color: {color};"
					on:click={() => onChange(option)} />
			{/each}
		</ul>
	</div>
	<p class="field__value">{current ? current.label : ''}</p>
</div>
