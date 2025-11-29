<script lang="ts">
  const { resource }: ResourceItemProps = $props();
</script>

<div>
  {#if resource.type === 'image'}
    <a href={resource.url}><img src={resource.url} alt={resource.alt} /></a>
  {:else}
    {#if resource.broken}
      <a class="broken-link" title="This link does not have any archived copies" href={resource.url}>{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '').replace('%7E', '~')}</a>
    {:else}
      <a title={resource.alt} href={resource.url}>{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '').replace('%7E', '~')}</a>
    {/if}
  {/if}

  <span>{resource?.description ?? resource.type}</span>
</div>

<style>
img {
  max-width: 300px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
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
  color: var(--color-inactive);
}
</style>

