<script lang="ts">
  const { resource }: ResourceItemProps = $props();

  if (resource.url && resource.url.includes('list.ewtoo.org') && !resource.url.includes('archive.org')) {
    resource.url = `https://web.archive.org/web/20061229123856/${resource.url}`;
    resource.description = '(archived)';
  }

  if (resource.url && resource.type === 'host' && resource.broken) {
    resource.description = '(defunct)';
  }
</script>

<div>
  {#if resource.type === 'image'}
    <a href={resource.url}><img src={resource.url} alt={resource.alt} /></a>
  {:else if resource.type === 'host' && resource.broken}
    <span title="This host is no longer accessible">{resource.url.replace('telnet:', '')}</span>
  {:else if resource.broken}
    <a disabled title="This link does not have any archived copies" href={resource.url}>{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '').replace('%7E', '~')}</a>
  {:else}
    <a title={resource.alt} href={resource.url}>{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '').replace('%7E', '~')}</a>
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

[disabled] {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>

