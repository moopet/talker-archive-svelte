<script lang="ts">
  import { onMount } from 'svelte';
  import type { TalkerCardProps } from '$lib/types';
  import slugify from 'slugify';
  import { getTalkerSlug, isTalkerActive } from '$lib/utils.ts';

  let { talker }: TalkerCardProps = $props();

  const href = `/details/${getTalkerSlug(talker)}`;
  const defaultImage = '/placeholder.png';
  const src = talker?.screencaps?.length ?? 0 > 0 ? `/screencaps/${talker.screencaps[0]}` : defaultImage;

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

    span {
      background-color: green;
      color: white;
    }
  }
}

span {
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  padding-block-start: 1rem;
  padding-block-end: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

img {
  width: 260px;
  height: 135px;
}
</style>

