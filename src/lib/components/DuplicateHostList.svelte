<script lang="ts">
  import { findTalkersByHost, getTalkerSlug } from '$lib/utils.ts';

  let { talker } = $props();

  const getDuplicateTalkers = (hosts: Array<Resource>): Array<Talker> => {
    const duplicateTalkers: Array<Talker> = [];

    hosts.forEach(item => {
      findTalkersByHost(item.hostname, item.port)
        .filter(t => t.name !== talker.name)
        .map(t => ({...t, matchingHostname: item.hostname, matchingPort: item.port}))
        .forEach(t => duplicateTalkers.push(t));
    });

    return duplicateTalkers
      .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));
  };

  const talkers = getDuplicateTalkers(talker?.hosts ?? []);
</script>

{#if talkers.length > 0}
  <section>
    <h2>Other talkers that share the same address (host and port)</h2>

    <p>
      These could simply be different talkers reusing the same ports over time, but they are also potentially duplicates, replacements or mistakes in the data library.
    </p>

    <table>
      <thead>
        <tr>
          <th>Talker name</th>
          <th>Address</th>
        </tr>
      </thead>

      <tbody>
        {#each talkers as talker}
          <tr>
            <td><a data-sveltekit-reload href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>
            <td><a href={`telnet:${talker.matchingHostname}:${talker.matchingPort}`}>{talker.matchingHostname}:{talker.matchingPort}</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
{/if}

<style>
section {
  text-align: left;
  width: 100%;
  max-width: 100%;
}
</style>
