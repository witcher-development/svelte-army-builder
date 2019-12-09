<script lang="ts">
	export let id;
	export let name;
	export let health;
	export let attack;
	export let image;
	export let text;
	export let flavorText;
	export let rarity;
</script>

<style type="text/scss">
	.card {
		width: 130px;

		margin-right: 10px;
		&:nth-child(3n) {
			margin-right: 0;
		}

		img {
			width: 100%;
			object-fit: contain;
		}

		p {
			display: none;
		}
	}
</style>

<li class="card">
	<p>{id}</p>
	<p>{name}</p>
	<p>{health}</p>
	<p>{attack}</p>
	<img src={image} alt={name}>
	<p>{text}</p>
	<p>{flavorText}</p>
	<p>{rarity}</p>
</li>
