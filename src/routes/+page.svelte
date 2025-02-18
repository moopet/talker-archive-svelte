<script lang="ts">
  import { talkers, resources, codebases } from '$lib/data/talkers.json';

  import TalkerList from '$lib/components/TalkerList.svelte';

  let hideEmptyEntries: boolean = $state(false);
  let searchTerm: string = $state("");

  let filteredTalkers = $derived(
    talkers
      .filter(talker => (talker?.screencaps?.length ?? 0) !== 0 || !hideEmptyEntries)
      .filter(talker => talker.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
</script>

<section>
  <h1>This is an archive of talkers.</h1>
  <p>
    {talkers?.length ?? 0} {talkers?.length !== 1 ? 'talkers' : 'talker'}, to be precise.
  </p>
  <p>
    Some are still online&hellip; most, however, only live on in our memories.
  </p>
</section>

<fieldset>
  <div>
    <label for="search-term">Talker name</label>
    <input type="text" bind:value={searchTerm} id="search-term" />
  </div>

  <div>
    <input type="checkbox" bind:checked={hideEmptyEntries} id="hide-empty-entries-toggle" />
    <label for="hide-empty-entries-toggle">Hide talkers without screenshots</label>
  </div>
</fieldset>

<TalkerList talkers={filteredTalkers} />

<style>
section {
  padding-block-start: 2rem;
  padding-block-end: 4rem;
  text-align: center;
}

fieldset {
  padding-inline-start: 2rem;
  padding-inline-end: 2rem;
  padding-block-start: 2rem;
  padding-block-end: 2rem;
  border-width: 0;
  background-color: var(--card-background-color);
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
}

[type=text] {
  background-color: transparent;
  padding-inline-start: 2rem;
  padding-inline-end: 0.5rem;
  padding-block-start: 0.5rem;
  padding-block-end: 0.5rem;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 2px;
  border-color: inherit;
}

[type=checkbox] {
  opacity: 0;
	height: 0;
	width: 0;
}

label[for=hide-empty-entries-toggle] {
	cursor: pointer;
	text-indent: -20rem;
	width: 40px;
	height: 16px;
	background-color: var(--color-light-dim);
	display: block;
	border-radius: 25px;
	position: relative;
}

label[for=hide-empty-entries-toggle] {
  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 25px;
    transition: 0.3s;
  }
}

input:checked + label {
	background-color: var(--color-accent-dim);
}

input:checked + label:after {
	left: calc(100% + 3px);
	background-color: var(--link-color);
	transform: translateX(-100%);
}
</style>
