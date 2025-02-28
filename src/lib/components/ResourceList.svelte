<script lang="ts">
  import ResourceItem from '$lib/components/ResourceItem.svelte';

  const { title, resources }: ResourceListProps = $props();
</script>

<div>
  <h2>{title}</h2>
  <ul>
    {#each resources as resource: Resource}
      <li>
        <ResourceItem {resource} />
      </li>
    {/each}
  </ul>
</div>

<style>
div {
  text-align: start;
  flex-basis: 300px;
}

h2 {
  color: white;
  font-size: 1rem;
  font-weight: normal;
  white-space: nowrap;
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
}

ul {
  padding-inline-start: 0;
}

li {
  list-style-type: none;
}
</style>

