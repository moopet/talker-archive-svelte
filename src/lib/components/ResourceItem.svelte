<script lang="ts">
  import type { ResourceItemProps } from '$lib/types';
  const { resource }: ResourceItemProps = $props();
</script>

<div>
  {#if resource.type === 'image'}
    <a href={resource.url}><img src={resource.url} alt={resource.alt} /></a>
  {:else}
    {#if resource.broken}
      <span class="broken-link" title="This link does not have any archived copies">{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '').replace('%7E', '~')}</span>
    {:else}
      <a title={resource.alt} href={resource.url}>{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '').replace('%7E', '~')}</a>
    {/if}
  {/if}

  <span>{resource?.description ?? resource.type}</span>
</div>

<style>
img {
  max-width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
}

@media(min-width: 1024px) {
  img {
    max-width: 300px;
  }
}

div {
  display: flex;
  flex-direction: column;
  margin-block-end: 1rem;
}

span {
  font-size: 0.9rem;
}

.broken-link {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>

