<script lang="ts">
  import type { Talker, TalkerListProps } from '$lib/types';

  import TalkerCard from '$lib/components/TalkerCard.svelte';

  let { talkers }: TalkerListProps = $props();
</script>

<ol>
  {#each talkers as talker: Talker (talker.name)}
    <li><TalkerCard {talker} /></li>
  {/each}
</ol>

<style>
ol {
  padding-inline-start: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

@media(min-width: 1100px) {
  ol {
    justify-content: flex-start;
  }
}

li {
  list-style-type: none;
  margin-block-end: 1rem;
}
</style>

