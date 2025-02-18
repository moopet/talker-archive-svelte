<script lang="ts">
  import type { Talker, TalkerListProps } from '$lib/types';

  import TalkerCard from '$lib/components/TalkerCard.svelte';

  let { talkers }: TalkerListProps = $props();
</script>

<ol>
  {#each talkers as talker: Talker }
    <li><TalkerCard {talker} /></li>
  {/each}
</ol>

<style>
ol {
  padding-inline-start: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}

li {
  list-style-type: none;
}
</style>

