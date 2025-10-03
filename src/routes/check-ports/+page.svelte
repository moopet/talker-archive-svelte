<!-- src/routes/check-ports/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import slugify from 'slugify';

  let results = [];
  let loading = false;
  let error = '';

  async function checkPorts() {
    loading = true;

    try {
      const now = new Date();
      // Cache lasts 10 minutes.
      const cacheBust = `${now.getDate()}-${now.getHours()}-${Math.floor(now.getMinutes() / 10)}`;

      const response = await fetch(`/api/check-ports?cb=${cacheBust}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      results = await response.json();
    } catch (err) {
      error = `Error: ${err.message}`;
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
    <p class="error">{error}</p>
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
            <td>UP</td>
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
