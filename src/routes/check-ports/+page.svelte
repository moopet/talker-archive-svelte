<!-- src/routes/check-ports/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let results: { hostname: string; ip?: string; port: number; isConnectable: boolean; error?: string }[] = [];
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
    } catch (err) {
      error = `Error: ${err.message}`;
    }
    loading = false;
  }

  onMount(() => {
    //checkPorts(); // Automatically check ports on page load
  });
</script>

<section>
    <h1>Talker Connectivity Status</h1>
    <button on:click={checkPorts} disabled={loading}>
      {loading ? 'Checking...' : 'Refresh Status'}
    </button>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if results.length > 0}
      <ul>
        {#each results as result}
          {#if result.isConnectable}
            <li>
              {result.name} 
              <a href="telnet:{result.hostname}:{result.port}">{result.hostname}:{result.port}</a>
            </li>
          {/if}
        {/each}
      </ul>
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

  ul {
    text-align: left;
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }
</style>
