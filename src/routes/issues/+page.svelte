<script lang="ts">
  import { talkers } from '$lib/data/talkers.json';
  import { getTalkerSlug } from '$lib/utils.ts';

  const issues = [];

  talkers.forEach(t => {
    if ((t.resources ?? []).some(r => {
      if (r.type === 'website' || !r.broken) {
        return true;
      }

      if (r.type === 'wayback') {
        return true;
      }

      return false;
    })) {
      return;
    }

    issues.push(t);
  });
</script>

<svelte:head>
  <title>Issues - Talker Archive</title>
</svelte:head>

<section>
  <h1>Issues</h1>

  <h2>Websites with no website or archive resources</h2>

  <ul>
    {#each issues as talker}
      <li><a href={`/details/${getTalkerSlug(talker)}`}>{talker.name}</a></li>
    {/each}
  </ul>
</section>
