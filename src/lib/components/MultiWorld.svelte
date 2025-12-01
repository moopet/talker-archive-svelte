<script lang="ts">
  import { findTalkersByMultiWorld, getMultiWorld, getTalkerSlug } from '$lib/utils';
  import { multiWorlds } from '$lib/data/talkers.json';

  let { shortName }: MultiWorldProps = $props();
  const multiWorld = getMultiWorld(shortName);

  const talkers: Talker[] = findTalkersByMultiWorld(shortName)
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));
</script>

<section>
  {#if multiWorld.name}
    <h2>{multiWorld.name}</h2>
  {/if}

  {#if multiWorld.description}
    <p>
      {@html multiWorld.description}

      {#if multiWorld.url}
        (<a href={multiWorld.url}>read more&hellip;</a>)
      {/if}
    </p>
  {:else}
    {#if multiWorld.url}
      <p>
        This talker is part of a "multiple-worlds" group.
        (<a href={multiWorld.url}>read more&hellip;</a>)
      </p>
    {/if}
  {/if}

  <h3>Talkers in the "{multiWorld.name}" multi-world group</h3>

  <table>
    <thead>
      <tr>
        <th>Talker name</th>
      </tr>
    </thead>

    <tbody>
      {#each talkers as talker}
        <tr>
          <td><a data-sveltekit-reload href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  section {
    text-align: left;
    width: 100%;
    max-width: 100%;
  }
</style>
