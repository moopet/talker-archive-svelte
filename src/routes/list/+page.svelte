<script lang="ts">
  import { onMount } from 'svelte';
  import slugify from 'slugify';
  import { formatDistanceToNow } from 'date-fns';
  import { getActiveTalkers, getTalkerSlug } from '$lib/utils.ts';
  import { getCodebase, getCodebases, getSlug, getTalkers } from '$lib/database';

  type SortDirection = 'asc' | 'desc' | null;

  let sortKey: SortKey | null = null;
  let sortDirection: SortDirection = null;

  let loading: boolean = $state(true);
  let error: string = $state('');
  let lastCheckedDate = $state(null);
  let showClosedTalkers: boolean = $state(false);
  let codebaseFilter: string = $state('');
  let searchFilter: string = $state(null);
  let ageFilter: string = $state('');

  let allTalkers = $state(getTalkers());
  let activeTalkers = $state([]);

  let filteredTalkers = $derived(
    allTalkers
      .filter(x => !searchFilter || x.name.toLowerCase().includes(searchFilter.toLowerCase()))
      .filter(x => !codebaseFilter || x.codebase === codebaseFilter)
      .filter(x => !ageFilter || x.ageFilter === ageFilter)
      .filter(x => showClosedTalkers || !x.isClosed)
  );

  const getSortIndicator = (key: string): string => {
    if (key === sortKey) {
      if (sortDirection == 'asc') {
        return '↑';
      }

      if (sortDirection == 'asc') {
        return '↓';
      }
    }

    return '⇵';
  };

  const handleSort = (key: string): void => {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 
                      sortDirection === 'desc' ? null : 'asc';
    }
    else {
      sortKey = key;
      sortDirection = 'asc';
    }

    switch (key) {
      case 'name':
        allTalkers.sort((a: Talker, b: Talker): number => {
          const aSlug: string = (a.slug ?? getSlug(a.name)).replace('_', '');
          const bSlug: string = (b.slug ?? getSlug(b.name)).replace('_', '');

          if (sortDirection === 'asc') {
            return bSlug.localeCompare(aSlug);
          }

          return aSlug.localeCompare(bSlug);
        });
        break;

      case 'address':
        allTalkers.sort((a: Talker, b: Talker): number => {
          const aAddress: string = a.hostname ? `${a.hostname}{a.port}` : '';
          const bAddress: string = b.hostname ? `${b.hostname}{b.port}` : '';

          if (sortDirection === 'asc') {
            return bAddress.localeCompare(aAddress);
          }

          return aAddress.localeCompare(bAddress);
        });
        break;

      case 'codebase':
        allTalkers.sort((a: Talker, b: Talker): number => {
          const aCodebase: string = a.codebase ?? '';
          const bCodebase: string = b.codebase ?? '';

          if (sortDirection === 'asc') {
            return bCodebase.localeCompare(aCodebase);
          }

          return aCodebase.localeCompare(bCodebase);
        });
        break;

      case 'age-restriction':
        allTalkers.sort((a: Talker, b: Talker): number => {
          if (a.ageRestriction === b.ageRestriction) {
            return 0;
          }

          const aAge = parseInt(a.ageRestriction ?? '0', 10) || 0;
          const bAge = parseInt(b.ageRestriction ?? '0', 10) || 0;

          if (sortDirection === 'asc' && aAge > bAge) {
            return 1;
          }

          if (sortDirection === 'desc' && aAge < bAge) {
            return 1;
          }

          return -1;
        });
        break;

      case 'multi-world':
        allTalkers.sort((a: Talker, b: Talker): number => {
          if (typeof a.multiWorld === typeof b.multiWorld) {
            return 0;
          }

          if (sortDirection === 'asc' && typeof a.multiWorld === 'string') {
            return 1;
          }

          if (sortDirection === 'desc' && typeof b.multiWorld === 'string') {
            return 1;
          }

          return -1;
        });
        break;

      case 'status':
        allTalkers.sort((a: Talker, b: Talker): number => {
          if (a.isConnectable === b.isConnectable) {
            return 0;
          }

          if (sortDirection === 'asc' && a.isConnectable) {
            return 1;
          }

          if (sortDirection === 'desc' && b.isConnectable) {
            return 1;
          }

          return -1;
        });
        break;

      default:
        break;
    }
  };

  async function highlightActiveTalkers() {
    loading = true;

    try {
      const results = await getActiveTalkers();

      activeTalkers = results.talkers;
      lastCheckedDate = new Date(results.dateChecked);

      const activeTalkerNames = activeTalkers.map(talker => talker.name);

      allTalkers
        .filter(t => (t.hosts ?? []).length === 0)
        .forEach(talker => {
          talker.isClosed = true;
        });

      allTalkers
        .filter(t => t.hosts)
        .forEach(talker => {
          const match = activeTalkers.find(activeTalker => activeTalker.name === talker.name);

          talker.isClosed = talker.hosts.every(h => h?.blocked);

          if (match) {
            talker.isConnectable = true;
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
  <h1>Talker database</h1>

  {#if error}
    <p class="error">There was an error fetching the data.</p>

    <p>
      Sorry, it looks like the connectivity checker service is offline at the moment.<br>
      Come back and try again later or pester the maintainer, if you can find them.
    </p>
  {/if}

  {#if lastCheckedDate}
    <h2><span class="active-count">{activeTalkers.length}</span> of <span class="total-count">{allTalkers.length}</span> talkers are <em>potentially</em> active</h2>
  {/if}

  <fieldset class="filters">
    <div class="search">
      <label for="search-filter">Name</label>
      <input type="text" bind:value={searchFilter} id="search-filter" />
    </div>

    <div class="age">
      <label for="age-filter">Age</label>
      <select bind:value={ageFilter} id="age-filter">
        <option value="">- Any -</option>
        <!--
        <option value="13+">13+</option>
        -->
        <option value="child">Child-friendly</option>
        <option value="18+">Adult (18+)</option>
      </select>
    </div>

    <div class="codebase">
      <label for="codebase-filter">Codebase</label>
      <select bind:value={codebaseFilter} id="codebase-filter">
        <option value="">- Any -</option>
        {#each getCodebases() as codebase}
          <option value={codebase.shortName}>{codebase.name}</option>
        {/each}
      </select>
    </div>
  </fieldset>

  <fieldset>
    <div class="show-closed-talkers">
      <input type="checkbox" bind:checked={showClosedTalkers} id="show-closed-talkers-toggle" />
      <label for="show-closed-talkers-toggle"><span>show closed talkers</span></label>
    </div>
  </fieldset>

  <p>
    Showing <strong>{filteredTalkers.length}</strong> {filteredTalkers.length === 1 ? 'result' : 'results'}.

    {#if lastCheckedDate}
      Last update: {formatDistanceToNow(lastCheckedDate, { addSuffix: true })}
    {/if}
  </p>

  <table>
    <thead>
      <tr>
        <th onclick={() => handleSort('name')}>
          Name
          <span class="sort-direction">{getSortIndicator('name')}</span>
        </th>

        <th onclick={() => handleSort('address')}>
          Address
          <span class="sort-direction">{getSortIndicator('address')}</span>
        </th>

        <th onclick={() => handleSort('codebase')}>
          Codebase
          <span class="sort-direction">{getSortIndicator('codebase')}</span>
        </th>

        <th onclick={() => handleSort('age-restriction')}>
          Ages
          <span class="sort-direction">{getSortIndicator('age-restriction')}</span>
        </th>

        <th onclick={() => handleSort('multi-world')}>
          Multi-world?
          <span class="sort-direction">{getSortIndicator('multi-world')}</span>
        </th>

        <th onclick={() => handleSort('status')}>
          Status
          <span class="sort-direction">{getSortIndicator('status')}</span>
        </th>
      </tr>
    </thead>

    <tbody>
      {#each filteredTalkers as talker}
        <tr>
          <td><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></td>

          <td>
            {#if talker.isConnectable}
              <a href="telnet://{talker.hostname}:{talker.port}">{talker.hostname}:{talker.port}</a>
            {:else}
              <span>n/a</span>
            {/if}
          </td>

          <td class={talker.codebase ? 'codebase' : 'unknown'}>
            {talker.codebase ? (getCodebase(talker.codebase)?.name ?? talker.codebase) : 'Unknown'}
          </td>

          <td class={talker.ageRestriction ? 'age-restriction' : 'unknown'}>
            {talker.ageRestriction ?? 'Any'}
          </td>

          <td class={talker.multiWorld ? 'multi-world' : 'unknown'}>
            {talker.multiWorld ? 'Yes' : 'No'}
          </td>

          {#if loading}
            <td class="status-loading">...</td>
          {:else}
            {#if talker.isConnectable}
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
      {/each}
    </tbody>
  </table>
</section>

<style>
  section {
    max-width: 60rem;
  }

  h2 {
    border-width: 0;
  }

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

  .unknown,
  .status-closed {
    color: #444;
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

  th {
    min-width: 8rem;

    span {
      float: right;
    }
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

    &.filters {
      justify-content: space-between;
    }

    + fieldset {
      padding-block-start: 0;
    }
  }

  [type=checkbox] {
    opacity: 0;
	  height: 0;
	  width: 0;
  }

  .show-closed-talkers:focus-within {
    outline: medium auto currentColor;
  }

  label:after {
    content: ':';
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

  input[type=text] {
    width: 22rem;
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

  strong {
    font-size: 1.25em;
  }
</style>
