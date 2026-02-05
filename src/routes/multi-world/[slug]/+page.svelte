<script lang="ts">
  import { page } from '$app/state';
  import MultiWorld from '$lib/components/MultiWorld.svelte';
  import { getMultiWorld } from '$lib/database';

  const slug: string = page.params?.slug ?? "";
  const multiWorld = getMultiWorld(slug);
</script>

<svelte:head>
  {#if multiWorld}
    <title>{multiWorld.name} - Talker Archive</title>
  {:else}
    <title>Multi-world group not found</title>
  {/if}
</svelte:head>

<section>
  <h1>Multi-world information</h1>

  {#if multiWorld}
    <MultiWorld shortName={slug} />
  {:else}
    <p class="error">Multi-world group not found.</p>
  {/if}
</section>

