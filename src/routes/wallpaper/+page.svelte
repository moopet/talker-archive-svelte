<script lang="ts">
import { talkers } from '$lib/data/talkers.json';

const talkersWithScreencaps = talkers.filter(x => x.screencaps).filter(x => x.name !== 'The Rainbow Room');
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
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

div {
  overflow: hidden;
  max-height: 120px;
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
