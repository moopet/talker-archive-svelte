<script lang="ts">
  import { page } from '$app/state';
  import { findTalkersByMultiWorld, getTalkerSlug } from '$lib/utils.ts';
  import { multiWorlds } from '$lib/data/talkers.json';

  const slug: string = (page.params?.slug ?? "").toLowerCase();
  const multiWorld = multiWorlds.find(item => item.shortName.toLowerCase() === slug);
  const talkers: Talker[] = findTalkersByMultiWorld(slug)
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));
</script>

<section>
  {#if multiWorld}
    <h1>{multiWorld.name}</h1>

    {#if multiWorld.description}
      <p>
        {@html multiWorld.description}
      </p>
    {/if}

    {#if talkers.length > 0}
      <table>
        <thead>
          <tr>
            <th>Talker name</th>
          </tr>
        </thead>

        <tbody>
          {#each talkers as talker}
            <tr>
              <td><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>
        No talkers belonging to this multi-world found in the database.
      </p>
    {/if}
  {:else}
    <h1 class="error">404: Multi-world not found</h1>
  {/if}
</section>

<style>
  .error {
    color: red;
  }
</style>
