<script lang="ts">
	import { getState } from '../../store/filter';
</script>

<style type="text/scss">
	.filter {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		padding: 37px 30px;

		border-radius: 13px;
		background-color: rgba(0, 0, 0, 0.7);
	}
</style>

<div class="filter">
	{#each getState() as field}
		<div class="filter__field">
			<p>{field.name}</p>
			<select>
				{#each field.options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	{/each}
</div>
