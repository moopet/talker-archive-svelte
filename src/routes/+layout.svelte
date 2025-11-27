<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { browser, dev } from '$app/environment';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import { getActiveTalkers } from '$lib/client-active-talkers';
  import { activeTalkersStore } from '$lib/stores/activeTalkers';

  injectSpeedInsights();
  injectAnalytics({ mode: dev ? 'development' : 'production' });

  if (browser) {
    document.body.dataset.hasJs = "true";
  }

	import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  type LayoutProps = {
    children: Snippet;
    data: { currentUrl: string };
  };

	let { children, data }: LayoutProps = $props();
  const { currentUrl } = data;

	onMount(async () => {
    try {
      const data = await getActiveTalkers();
      activeTalkersStore.set(data);
    } catch (err) {
      console.error('Failed to load active talkers:', err);
    }
  });
</script>

<svelte:head>
  <meta property="og:site_name" content="Talker Archive">
  <meta property="og:url" content={currentUrl}>
</svelte:head>

<Header />
<main>
  {@render children?.()}
</main>
<Footer />

<style>
</style>

