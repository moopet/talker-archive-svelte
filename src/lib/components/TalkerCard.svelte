<script lang="ts">
  import { onMount } from 'svelte';
  import type { TalkerCardProps } from '$lib/types';
  import slugify from 'slugify';
  import { isTalkerActive } from '$lib/utils.ts';

  let { talker }: TalkerCardProps = $props();

  const href = `/details/${slugify(talker.name, {lower: true})}`;
  const defaultImage = '/placeholder.png';
  const src = talker?.screencaps?.length ?? 0 > 0 ? `/screencaps/login/${talker.screencaps[0]}` : defaultImage;

  let isActive = $state(false);

  async function checkActive() {
    isActive = await isTalkerActive(talker);
  }

  onMount(() => {
    checkActive();
  });
</script>

<a {href} class={isActive ? 'active' : ''}>
  <img {src} alt="" />
  <span>{talker.name}</span>
</a>

<style>
a {
  display: flex;
  border: 1px solid var(--border-color, #333333);
  border-radius: 4px;
  background-color: var(--card-background-color, black);
  color: var(--card-text-color, white);
  flex-direction: column;
  text-decoration: none;
  justify-content: space-between;
  overflow: hidden;

  &.active {
    border-color: green;
    border-width: 2px;
  }
}

span {
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  padding-block-start: 1rem;
  padding-block-end: 1rem;
  max-width: 16rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

img {
  width: 260px;
  height: 135px;
}
</style>

