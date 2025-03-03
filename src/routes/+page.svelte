<script lang="ts">
  import slugify from 'slugify';

  import { talkers, resources, codebases } from '$lib/data/talkers.json';

  import TalkerList from '$lib/components/TalkerList.svelte';

  let showEmptyEntries: boolean = $state(false);
  let searchTerm: string = $state("");

  let filteredTalkers = $derived(
    talkers
      .filter(talker => (talker?.screencaps?.length ?? 0) !== 0 || showEmptyEntries)
      .filter(talker => talker.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
      .sort((a, b) => {
        const slugA: string = slugify(a.name).replace(/^(a|the)-/, '');
        const slugB: string = slugify(b.name).replace(/^(a|the)-/, '');

        return slugA.localeCompare(slugB);
      })
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
  <div class="search-term">
    <label for="search-term">Talker name</label>
    <input type="text" bind:value={searchTerm} id="search-term" />
  </div>

  <div class="show-empty-entries">
    <input type="checkbox" bind:checked={showEmptyEntries} id="show-empty-entries-toggle" />
    <label for="show-empty-entries-toggle"><span>show talkers without screenshots</span></label>
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
  flex-direction: column;
  justify-content: space-between;
}

[type=text] {
  background-color: var(--input-background-color, transparent);
  padding-inline-start: 2rem;
  padding-inline-end: 0.5rem;
  padding-block-start: 0.5rem;
  padding-block-end: 0.5rem;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 2px;
  border-color: inherit;

  &:focus-visible {
    border-color: var(--color-accent);
  }
}

[type=checkbox] {
  opacity: 0;
	height: 0;
	width: 0;
}

label[for=show-empty-entries-toggle] {
	cursor: pointer;
	text-indent: -16rem;
	width: 40px;
	height: 16px;
	background-color: var(--toggle-track-color-off);
	display: block;
	border-radius: 25px;
	position: relative;

  span {
    position: absolute;
    left: 0;
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

.show-empty-entries {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  fieldset {
    flex-direction: row;
  }
}
</style>
