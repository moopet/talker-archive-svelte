<script lang="ts">
  const { resource }: ResourceItemProps = $props();
</script>

<span>
  {#if resource.type === 'image'}
    <img src={resource.url} alt="{resource.alt}" />
  {:else}
    <a href={resource.url}>{resource.name}</a>
  {/if}
</span>

<style>
img {
  max-width: 352px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
}
</style>

