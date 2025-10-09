<script lang="ts">
  import { resources } from '$lib/data/talkers.json';

  import ResourceList from '$lib/components/ResourceList.svelte';

  const articleResourceTypes: Array<string> = [
    'Article'
  ];

  const communityResourceTypes: Array<string>  = [
    'Facebook group',
    'Livejournal community'
  ];

  const sourceCodeResourceTypes: Array<string>  = [
    'Repository'
  ];

  const otherResourceTypes: Array<string>  = [
    'Hosting',
    'Website'
  ];
</script>

<section>
  <h1>About this project</h1>
  <h2>Resources</h2>
  <p>
    This is an attempt to collect talker-related resources that might get missed on a casual web search.
  </p>
  <p>
    This sort of page used to be called "bookmarks", or "useful links" back in the day. Nobody used to read them then, either.
  </p>
</section>

<section>
  <h2>API</h2>
  <p>
    If you want a list of active talkers in JSON format, you can get it from <a href="https://talkers.moopet.net/api/active-talkers">/api/active-talkers</a>.
    This may or may not be particularly up-to-date.
  </p>

  <p>
    If you want the raw data for all the talkers, look in the <a href="https://github.com/moopet/talker-archive-svelte/blob/main/src/lib/data/talkers.json">talkers.json file in the repository</a>.
  </p>
</section>

<section>
  <h2>Helping out</h2>
  <p>
    This is work in progress.<br>
    A lot of links are from the Wayback Machine or my own memory. A lot of info might simply be <em>wrong</em>.
  </p>

  <p>
    If you have a correction to any of the info here, want something removed or updated... or you know about a talker I've missed, I'd love to hear from you.
  </p>

  <p>
    Drop me a line at <a href="mailto:ben@moopet.net">ben@moopet.net</a> or raise an issue on the <a href="https://github.com/moopet/talker-archive-svelte/issues">GitHub repository</a>.
  </p>
</section>

<section class="resources">
  <ResourceList title="Articles" resources={resources.filter(resource => articleResourceTypes.includes(resource.type))} />
  <ResourceList title="Community" resources={resources.filter(resource => communityResourceTypes.includes(resource.type))} />
  <ResourceList title="Source code" resources={resources.filter(resource => sourceCodeResourceTypes.includes(resource.type))} />
  <ResourceList title="Other" resources={resources.filter(resource => otherResourceTypes.includes(resource.type))} />
</section>

<style>
section {
  text-align: left;
}

section + section {
  padding-block-start: 0;
}

h2 {
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 1px;
  border-style: solid;
  border-color: var(--border-color);
}

.resources {
  max-width: calc(100% - 2rem);
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

@media (min-width: 560px) {
  .resources {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .resources {
    gap: 2rem;
  }
}
</style>
