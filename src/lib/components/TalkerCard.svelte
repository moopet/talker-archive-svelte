<script lang="ts">
  import type { TalkerCardProps } from '$lib/types';

  let { talker }: TalkerCardProps = $props();

  const slugify = (text: string): string => text.trim().toLowerCase().replace(/[^a-z0-9]+/, '-');

  const href = `/details/${slugify(talker.name)}`;
  const defaultImage = '/placeholder.png';
  const src = talker?.screencaps?.length ?? 0 > 0 ? `/screencaps/login/${talker.screencaps[0]}` : defaultImage;
</script>

<a {href}>
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

