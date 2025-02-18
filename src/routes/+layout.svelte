<script lang="ts">
  import type { Snippet } from 'svelte';

	import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  type LayoutProps = {
    children: Snippet;
  };

	let { children }: LayoutProps = $props();
</script>

<Header />
<main>
  {@render children?.()}
</main>
<Footer />

<style>
</style>

