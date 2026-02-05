<script lang="ts">
import { talkers } from '$lib/data/talkers.json';
import { sortTalkersByName, getTalkerSlug } from '$lib/utils';

const sortedTalkers = sortTalkersByName(talkers);
</script>

<svelte:head>
  <title>Wallpaper - Talker Archive</title>
</svelte:head>

<section>
  {#each sortedTalkers as talker}
    {#if Array.isArray(talker.screencaps) && talker.screencaps.length > 0 && !talker.screencaps.every(path => path.includes('.map.'))}
      <a href={`/details/${getTalkerSlug(talker)}`}>
        <img src={`/screencaps/${talker.screencaps[0]}`} alt={talker.name} />
      </a>
    {/if}
  {/each}
</section>

<style>
section {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  max-height: 1200px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

a {
  display: inline-block;
  overflow: hidden;
  max-height: 137px;
  border-top: 7px solid black;
  background-color: black;
}

:global {
  main {
    max-width: 1920px !important;
  }
}

img {
  max-width: 160px;
}
</style>
