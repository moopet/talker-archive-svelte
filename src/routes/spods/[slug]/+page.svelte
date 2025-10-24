<script lang="ts">
  import { page } from '$app/state';
  import { findTalkersBySpod, getTalkerSlug } from '$lib/utils.ts';

  const spodName: string = page.params?.slug ?? "";
  const talkers: Talker[] = findTalkersBySpod(spodName)
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')))
    .map(item => {
      const coders = (item?.coders ?? []).map(x => x.toLowerCase())
      const admins = (item?.admins ?? []).map(x => x.toLowerCase());
      const lowerName = spodName.toLowerCase();

      if (admins.includes(lowerName) && coders.includes(lowerName)) {
        item.role = 'admin/coder';
      }
      else if (admins.includes(lowerName)) {
        item.role = 'admin';
      }
      else {
        item.role = 'coder';
      }

      return item;
    });
</script>

<section>
  <h1>Spod cross-reference</h1>

  <p>
    Note: just like in real life, it's entirely possible for more than one person to have the same spod name. Don't rely on jdoe being the same jdoe you knew from somewhere else.
  </p>

  {#if talkers.length > 0}
    <h2>{spodName}</h2>

    <table>
      <thead>
        <tr>
          <th>Talker name</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        {#each talkers as talker}
          <tr>
            <td><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>
            <td>{talker.role}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <h2 class="error">404: Spod not found</h2>
    <p>
      Whoever that is, either they don't exist in the database or... I don't know, maybe something else went wrong.
    </p>
  {/if}
</section>

<style>
  .error {
    color: red;
  }
</style>
