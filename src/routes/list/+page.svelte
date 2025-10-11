<script lang="ts">
  import { onMount } from 'svelte';
  import slugify from 'slugify';
  import { formatDistanceToNow } from 'date-fns';
  import { getActiveTalkers, getTalkerSlug } from '$lib/utils.ts';
  import { talkers } from '$lib/data/talkers.json';

  let loading = $state(false);
  let error = $state('');
  let lastCheckedDate = $state(null);

  let allTalkers = $state(talkers);
  let activeTalkers = $state([]);

  const sortedTalkers = talkers
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));

  async function highlightActiveTalkers() {
    loading = true;

    try {
      const results = await getActiveTalkers();

      activeTalkers = results.talkers;
      lastCheckedDate = new Date(results.dateChecked);

      const activeTalkerNames = activeTalkers.map(talker => talker.name);

      allTalkers.forEach(talker => {
        const match = activeTalkers.find(activeTalker => activeTalker.name === talker.name);

        talker.isClosed = talker.hosts.every(h => h?.blocked);

        if (match) {
          talker.isActive = true;
          talker.hostname = match.hostname;
          talker.port = match.port;
        }
      });
    } catch (err) {
      error = err.message;
    }

    loading = false;
  }

  onMount(() => {
   highlightActiveTalkers();
  });
</script>

<section>
  <h1>Talker Connectivity Checker</h1>

  {#if error}
    <p class="error">There was an error fetching the data.</p>
    <p>
      Sorry, it looks like the connectivity checker service is offline at the moment.<br>
      Come back and try again later or pester the maintainer, if you can find them.
    </p>
  {/if}

  {#if lastCheckedDate}
  <h2><span class="active-count">{activeTalkers.length}</span> of <span class="total-count">{allTalkers.length}</span> talkers are <em>potentially</em> active</h2>

    <p>Last update: {formatDistanceToNow(lastCheckedDate, { addSuffix: true })}</p>
  {/if}

  <table>
    <thead>
      <tr>
        <th>Talker name</th>
        <th>Address</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {#each allTalkers as talker}
        <tr>
          <td><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>

          <td>
            {#if talker.isActive}
              <a href="telnet://{talker.hostname}:{talker.port}">{talker.hostname}:{talker.port}</a>
            {:else}
              <span>n/a</span>
            {/if}
          </td>

          {#if talker.isActive}
            <td class="status-up">UP</td>
          {:else}
            {#if talker.isClosed}
              <td class="status-closed">CLOSED</td>
            {:else}
              <td class="status-down">DOWN</td>
            {/if}
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  .error {
    color: red;
  }

  .active-count {
    background-color: var(--status-active-background-color);
    padding: 0.5rem;
    border-radius: 50%;
    color: white;
  }

  .total-count {
    font-weight: bold;
  }

  .status-closed {
    color: #555;
  }

  .status-up {
    background-color: var(--status-active-background-color);
    color: white;
  }

  .status-down {
    color: var(--status-defunct-background-color);
  }

  td span {
    opacity: 0.3;
  }
</style>
