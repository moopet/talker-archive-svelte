<script lang="ts">
  import { onMount } from 'svelte';
  import { getTalkerStatus } from '$lib/utils.ts';

  const { talker } = $props();
  let status = $state('loading');

  async function checkActive() {
    status = await getTalkerStatus(talker);
  }

  onMount(() => {
    checkActive();
  });
</script>

<section class={status}>
  {#if status === 'active'}
    <p>
      The talker appears to be <em>active</em> - or at least it was connectable very recently. Why not give it a try?
    </p>
  {/if}

  {#if status === 'defunct'}
    <p>
      The talker is <em>closed</em> - either this has been explicitly stated by the owners or none of the known hosts exist any more.
    </p>
  {/if}
</section>

<style>
  section {
    max-width: none;
    padding: 0.25rem 1rem;
    margin-block-end: 1rem;
    width: 100%;
    color: white;

    &.loading {
      visibility: hidden;
    }
  }

  .active {
    background-color: rgba(0, 255, 0, 0.5);
  }

  .defunct {
    background-color: rgba(255, 0, 0, 0.5);
  }
</style>
