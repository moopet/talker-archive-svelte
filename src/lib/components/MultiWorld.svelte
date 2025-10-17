<script lang="ts">
  import { findTalkersByMultiWorld, getTalkerSlug } from '$lib/utils.ts';
  import { multiWorlds } from '$lib/data/talkers.json';

  let { talker }: MultiWorldProps = $props();
  const multiWorld = multiWorlds.find(item => item.shortName === talker?.multiWorld);
  const talkers: Talker[] = findTalkersByMultiWorld(talker?.multiWorld ?? '')
    .filter(item => talker.name !== item.name)
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));
</script>

<section>
  {#if multiWorld.description}
    <h2>{multiWorld.name}</h2>
    <p>
      {@html multiWorld.description}

      {#if multiWorld.url}
        (<a href={multiWorld.url}>read more&hellip;</a>)
      {/if}
    </p>
  {/if}

  <h2>Other talkers in the "{multiWorld.name}" group</h2>

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
