<script lang="ts">
  import type { Snippet } from 'svelte';
  import { browser, dev } from '$app/environment';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'

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

