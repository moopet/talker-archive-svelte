<script lang="ts">
import { talkers } from '$lib/data/talkers.json';
import { sortTalkersByName } from '$lib/utils';

const talkersWithScreencaps = sortTalkersByName(talkers).filter(x => x.screencaps).filter(x => !x.screencaps.every(path => path.includes('.map.')));
</script>

<section>
  {#each talkersWithScreencaps as talker}
    <div>
      <img src={`/screencaps/${talker.screencaps[0]}`} alt={talker.name} />
    </div>
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

div {
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
