<script lang="ts">
  import { multiWorlds } from '$lib/data/talkers.json';
  import MultiWorld from '$lib/components/MultiWorld.svelte';

  const sortedMultiWorlds = multiWorlds.sort((a, b) =>
    a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, ''))
  );
</script>

<svelte:head>
  <title>Multi-world listing - Talker Archive</title>
</svelte:head>

<section>
  <h1>Multi-world groups</h1>

  {#each sortedMultiWorlds as multiWorld}
    <MultiWorld shortName={multiWorld.shortName} />
  {/each}
</section>
