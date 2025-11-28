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

<svelte:head>
  <title>Resources - Talker Archive</title>
</svelte:head>

<section>
  <h1>Resources</h1>
  <p>
    This is an attempt to collect talker-related resources that might get missed on a casual web search.
  </p>

  <p>
    This sort of page used to be called "bookmarks", or "useful links" back in the day. Nobody used to read them then, either.
  </p>
</section>

<section class="resources">
  <ResourceList title="Articles" resources={resources.filter(resource => articleResourceTypes.includes(resource.type))} />
  <ResourceList title="Communities" resources={resources.filter(resource => communityResourceTypes.includes(resource.type))} />
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
