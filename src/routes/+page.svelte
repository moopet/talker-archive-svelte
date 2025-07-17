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
    <input type="text" bind:value={searchTerm} id="search-term" placeholder="Filter by talker name..." />
    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
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

.search-term {
  position: relative;
}

[type=text] {
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-inline-start: 2rem;
  padding-inline-end: 0.5rem;
  padding-block-start: 0.5rem;
  padding-block-end: 0.5rem;
  border-style: solid;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 1px;
  border-color: inherit;
  outline: none;

  &:hover {
    border-color: white;
  }

  &:focus-visible {
    border-color: var(--color-accent);
  }
}

label[for=search-term] {
	border: 0;
	clip: rect(0 0 0 0);
	height: auto;
	margin: 0;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	white-space: nowrap;
}

svg {
  fill: currentColor;
  width: 1.5rem;
  position: absolute;
  left: 0;
  top: 6px;
}

[type=checkbox] {
  opacity: 0;
	height: 0;
	width: 0;
}

.show-empty-entries:focus-within {
  outline: medium auto currentColor;
}

label[for=show-empty-entries-toggle] {
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

@media (min-width: 660px) {
  fieldset {
    flex-direction: row;
  }

  label[for=show-empty-entries-toggle] {
    margin-inline-start: 0;
    margin-block-start: 0;
  }
}
</style>
