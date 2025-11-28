<script lang="ts">
  import { talkers } from '$lib/data/talkers.json';

  const staff = [...new Set([
      ...talkers.flatMap(talker => talker?.admins ?? []),
      ...talkers.flatMap(talker => talker?.coders ?? [])
    ])]
    .sort((a, b) => a.localeCompare(b));

  const initial = (index: number): string => {
    const name = staff[index];
    const prevName = index > 0 ? staff[index - 1] : null;

    if (prevName && prevName.charAt(0).toLowerCase() === name.charAt(0).toLowerCase()) {
      return '';
    }

    return name.charAt(0).toUpperCase();
  };
</script>

<svelte:head>
  <title>Staff - Talker Archive</title>
</svelte:head>

<section>
  <h1>Talker Staff</h1>

  <aside class="disclaimer">
    <p>
      This isn't a spod-listing site. However, it seems like the ability to cross-reference talkers by their staff might be useful to some visitors.
    </p>

    <p>
      Standard disclaimer: more than one person may use the same name, people might be known under different names on different talkers, and people may change their names over time.
    </p>
  </aside>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Spod name</th>
      </tr>
    </thead>

    <tbody>
      {#each staff as spodName, index}
        <tr>
          <td class="initial">{initial(index)}</td>
          <td><a data-sveltekit-reload href={`/spods/${spodName.toLowerCase()}`}>{spodName}</a></td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  section,
  aside {
    text-align: left;
  }

  .initial {
    text-align: center;
    background-color: var(--card-background-color);
  }
</style>
