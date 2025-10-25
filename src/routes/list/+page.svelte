<script lang="ts">
  import { onMount } from 'svelte';
  import slugify from 'slugify';
  import { formatDistanceToNow } from 'date-fns';
  import { getActiveTalkers, getTalkerSlug } from '$lib/utils.ts';
  import { talkers } from '$lib/data/talkers.json';

  let loading: boolean = $state(true);
  let error: string = $state('');
  let lastCheckedDate = $state(null);
  let showClosedTalkers: boolean = $state(false);

  let allTalkers = $state(talkers);
  let activeTalkers = $state([]);

  const sortedTalkers = talkers
    .sort((a, b) => a.name.replace(/^the /i, '').replace("'", '').localeCompare(b.name.replace(/^the /i, '').replace("'", '')))

  async function highlightActiveTalkers() {
    loading = true;

    try {
      const results = await getActiveTalkers();

      activeTalkers = results.talkers;
      lastCheckedDate = new Date(results.dateChecked);

      const activeTalkerNames = activeTalkers.map(talker => talker.name);

      allTalkers
        .filter(t => t.hosts)
        .forEach(talker => {
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

  <fieldset>
    <div class="show-closed-talkers">
      <input type="checkbox" bind:checked={showClosedTalkers} id="show-closed-talkers-toggle" />
      <label for="show-closed-talkers-toggle"><span>show closed talkers</span></label>
    </div>
  </fieldset>

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
        {#if showClosedTalkers || !talker.isClosed}
          <tr>
            <td><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>

            <td>
              {#if talker.isActive}
                <a href="telnet://{talker.hostname}:{talker.port}">{talker.hostname}:{talker.port}</a>
              {:else}
                <span>n/a</span>
              {/if}
            </td>

            {#if loading}
                <td class="status-loading">...</td>
            {:else}
              {#if talker.isActive}
                <td class="status-up">UP</td>
              {:else}
                {#if talker.isClosed}
                  <td class="status-closed">CLOSED</td>
                {:else}
                  <td class="status-down">DOWN</td>
                {/if}
              {/if}
            {/if}
          </tr>
        {/if}
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

  fieldset {
    padding-inline-start: 2rem;
    padding-inline-end: 2rem;
    padding-block-start: 2rem;
    padding-block-end: 2rem;
    border-width: 0;
    background-color: var(--card-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  [type=checkbox] {
    opacity: 0;
	  height: 0;
	  width: 0;
  }

  .show-closed-talkers:focus-within {
    outline: medium auto currentColor;
  }

  label[for=show-closed-talkers-toggle] {
	  cursor: pointer;
	  width: 40px;
	  height: 16px;
	  background-color: var(--toggle-track-color-off);
	  display: block;
	  border-radius: 25px;
	  position: relative;
    margin-inline-start: 16rem;
    margin-block-start: 1rem;
    text-indent: -16rem;

    span {
      position: absolute;
      right: 0;
      top: -4px;
    }

    &:after {
      content: '';
      position: absolute;
      top: -2px;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: var(--toggle-knob-color-off);
      border-radius: 25px;
      transition: 0.3s;
    }
  }

  input:checked + label {
	  background-color: var(--toggle-track-color-on);
  }

  input:checked + label:after {
	  left: calc(100% + 3px);
	  background-color: var(--toggle-knob-color-on);
	  transform: translateX(-100%);
  }

  .show-closed-talkers {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 660px) {
    fieldset {
      flex-direction: row;
    }

    label[for=show-closed-talkers-toggle] {
      margin-inline-start: 0;
      margin-block-start: 0;
    }
  }
</style>
