<!-- src/routes/check-ports/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import slugify from 'slugify';
  import { getActiveTalkers } from '$lib/utils.ts';

  let results = [];
  let loading = false;
  let error = false;

  async function checkPorts() {
    loading = true;

    try {
      results = await getActiveTalkers();
    } catch (err) {
      error = true;
    }

    loading = false;
  }

  onMount(() => {
    checkPorts();
  });
</script>

<section>
  <h1>Talker Connectivity Checker</h1>

  <p>
    This tool checks connectivity with all the known talkers in the database.
  </p>

  {#if error}
    <p class="error">There was an error fetching the data.</p>
    <p>Sorry, it looks like the connectivity checker service is offline at the moment.</p>
    <p>Come back and try again later or pester the maintainer, if you can find them.</p>
  {/if}

  {#if results.dateChecked}
    <h2>{results.talkers.length} <em>potentially</em> active talkers found</h2>

    <p>Last update: {results.dateChecked}</p>

    <table>
      <thead>
        <tr>
          <th>Talker name</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {#each results.talkers as talker}
          <tr>
            <td><a href={`/details/${slugify(talker.name, { lower: true}).replace(/^the-/,'')}`}>{talker.name}</a></td>
            <td>
              <a href="telnet://{talker.hostname}:{talker.port}">{talker.hostname}:{talker.port}</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>

<style>
  .error {
    color: red;
  }
</style>
