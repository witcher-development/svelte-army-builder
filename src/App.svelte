<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { myStore } from "./store";

  const name: string = 'test';

  onMount(() => {
    console.log("App mounted");
  });
</script>

<div>
	<h1>Hello {name}!</h1>
</div>

<style>
	h1 {
		color: purple;
	}
</style>
