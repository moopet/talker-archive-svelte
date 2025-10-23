<script lang="ts">
  const { resource }: ResourceItemProps = $props();
</script>

<div>
  {#if resource.type === 'image'}
    <img src={resource.url} alt={resource.alt} />
  {:else}
    <a title={resource.alt} href={resource.url}>{(resource.name ?? resource.url).replace(/^https?:\/\//, '').replace('www.', '')}</a>
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
</style>

