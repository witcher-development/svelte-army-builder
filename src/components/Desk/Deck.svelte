<script lang="ts">

</script>

<style type="text/scss">
  .deck {
		&_wrapper {
			width: 50%;
		}

		width: 100%;
		height: 348px;

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
  }
</style>

<div class="deck_wrapper">
	<h2 class="deck__title">Your deck</h2>
	<div class="deck"></div>
</div>
