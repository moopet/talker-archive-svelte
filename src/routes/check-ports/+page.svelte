<!-- src/routes/check-ports/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { talkers } from '$lib/data/talkers.json';

  const allHosts = talkers
    .filter(talker => talker?.hosts?.length > 0)
    // .slice(0, 30)
    .map(talker => ({
      ...talker,
      hosts: talker.hosts.map(host => ({
        ...host,
        name: talker.name
      }))
    }))
    .flatMap((talker: InputObject) => talker.hosts)
    .sort((a, b) => a.name.localeCompare(b.name));

  let results = [];
  let loading = false;
  let error = '';

  async function checkPorts() {
    loading = true;
    error = '';

    try {
      const response = await fetch('/api/check-ports', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      results = await response.json();
      results = results.filter(result => result.isConnectable);
    } catch (err) {
      error = `Error: ${err.message}`;
    }
    loading = false;
  }

  onMount(() => {
    //checkPorts();
  });
</script>

<section>
  <h1>Talker Connectivity Checker</h1>

  <p>
    This tool checks connectivity with all the known talkers in the database.
  </p>

  <p>
    Sometimes talkers might not appear even if they're up, depending on the Internet weather conditions.
  </p>

  <button on:click={checkPorts} disabled={loading}>
    {loading ? 'Checking...' : 'Check connectivity'}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if loading}
    <p>please wait up to 30 seconds&hellip;</p>
  {/if}

  {#if results.length > 0}
    <h2>{results.length} <em>potentially</em> active talkers found</h2>

    <table>
      <thead>
        <tr>
          <th>Talker name</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {#each results as result}
          <tr>
            <td>{result.name}</td>
            <td>
              <a href="telnet://{result.hostname}:{result.port}">{result.hostname}:{result.port}</a>
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

  button {
    padding: 10px 20px;
    margin: 10px 0;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>
