<script lang="ts">
  import { findTalkersByGroup, getTalkerSlug } from '$lib/utils';
  import { groups } from '$lib/data/talkers.json';

  let { talker, shortName }: GroupProps = $props();
  const group = groups.find(item => item.shortName === shortName) as Group;

  const talkers: Talker[] = findTalkersByGroup(shortName)
    .filter(t => t.name !== talker.name)
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));
</script>

<section>
  <h2>Other talkers grouped with {talker.name}</h2>

  {#if group.description}
    <p>
      {@html group.description}

      {#if group.url}
        (<a href={group.url}>read more&hellip;</a>)
      {/if}
    </p>
  {:else}
    <p>
      This could be because they're the same talker re-written or renamed,
      because they're run by the same staff, or for literally any other reason.

      {#if group.url}
        (<a href={group.url}>read more&hellip;</a>)
      {/if}
    </p>
  {/if}

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

