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
  <h1>Helping out</h1>
  <p>
    This is work in progress.<br>
    A lot of links are from the Wayback Machine or my own memory. A lot of info might be <em>wrong</em>.
  </p>

  <p>
    If you have a correction to any of the info here, want something removed or updated... or you know about a talker I've missed, I'd love to hear from you.
  </p>

  <p>
    Drop me a line at <a href="mailto:ben@moopet.net">ben@moopet.net</a> or raise an issue on the <a href="https://github.com/moopet/talker-archive-svelte/issues">GitHub repository</a>.
  </p>
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
