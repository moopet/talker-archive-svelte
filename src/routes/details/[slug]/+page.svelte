<script lang="ts">
  import { page } from '$app/state';
  import type { Talker } from '$lib/types';
  import { talkers } from '$lib/data/talkers.json';

  const slug = (page.params?.slug ?? "").trim().toLowerCase();

  const talker: Talker = talkers.find(talker => talker.name.toLowerCase() === slug);

  const { name, hosts = [], screencaps = [], textcaps = [], description, codebase, ewtooAbbr, dataOrigin }: Talker = talker;
console.log({talker, name, description});
</script>

<article>
  <h1>{name}</h1>

  {#if description}
    <p class="description">
      {description}
    </p>
  {/if}
</article>
