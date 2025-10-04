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
  <h1>Resources</h1>
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
    This is presented as <a href="/list">a list on this site</a> as well.
  </p>
  <p>
    If you want the raw data for all the talkers, look in the <a href="https://github.com/moopet/talker-archive-svelte/blob/main/src/lib/data/talkers.json">talkers.json file in the repository</a>.
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
