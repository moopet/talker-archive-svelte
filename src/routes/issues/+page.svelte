<script lang="ts">
  import { talkers } from '$lib/data/talkers.json';
  import { getTalkerSlug } from '$lib/utils.ts';

  const issues = {
    wayback: []
  };

  talkers.forEach(t => {
    const websites = (t?.resources ?? []).filter(r => r.type === 'website' && !r.broken);

    if (websites.length > 0) {
      issues.wayback.push(t);
    }
  });
</script>

<svelte:head>
  <title>Issues - Talker Archive</title>
</svelte:head>

<section>
  <h1>Issues</h1>

  <h2>Websites to find on archive.org</h2>

  <ul>
    {#each issues.wayback as talker}
      <li><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></li>
    {/each}
  </ul>
</section>
