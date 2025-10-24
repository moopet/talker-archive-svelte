<script lang="ts">
  import { page } from '$app/state';
  import MultiWorld from '$lib/components/MultiWorld.svelte';
  import { findTalkersByMultiWorld } from '$lib/utils';

  const slug: string = page.params?.slug ?? "";
  const multiWorld = findTalkersByMultiWorld(slug);
</script>

<section>
  <h1>Multi-world information</h1>

  {#if multiWorld}
    <MultiWorld shortName={slug} />
  {:else}
    <p class="error">No such multi-world group: "{slug}"</p>
  {/if}
</section>

