<!-- src/routes/check-ports/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { talkers } from '$lib/data/talkers.json';

  let results = [];
  let loading = false;
  let currentLetterIndex = 0;
  let error = '';

  async function checkPort(letter: string) {
    try {
      const response = await fetch(`/api/check-ports?letter=${letter}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      let resultsForLetter = await response.json();
      resultsForLetter = resultsForLetter.filter(result => result.isConnectable);

      results = [...results, ...resultsForLetter];
    } catch (err) {
      error = `Error: ${err.message}`;
    }

    currentLetterIndex++;
  }

  async function checkPorts() {
    const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

    loading = true;
    currentLetterIndex = 0;

    for (const letter of alphabet) {
      await checkPort(letter);
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
      <label for="connectivity">Checking for open talkers:</label>
      <p>please wait up to 30 seconds&hellip;</p>
      <progress id="connectivity" value={currentLetterIndex} max="26">
        {(currentLetterIndex * 100 / 26).toFixed(1)}%
      </progress>
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
    margin: 10px auto;
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

  label {
    display: block;
  }

  progress {
    display: block;
    margin: 1rem auto;
  }
</style>
