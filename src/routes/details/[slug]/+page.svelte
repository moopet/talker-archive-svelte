<script lang="ts">
  import { page } from '$app/state';
  import type { Talker } from '$lib/types';
  import { talkers } from '$lib/data/talkers.json';
  import ResourceList from '$lib/components/ResourceList.svelte';

  const slug = (page.params?.slug ?? "").trim().toLowerCase();

  const talker: Talker = talkers.find(talker => talker.name.toLowerCase() === slug);

  const { name, hosts = [], screencaps = [], textcaps = [], description, codebase, ewtooAbbr, resources = [], dataOrigin }: Talker = talker;

  const hostResources: Array<Resource> = hosts.map(item => {
    return {
      alt: "",
      name: `${item.hostname}:${item.port}`,
      type: 'host',
      url: `telnet:${item.hostname}:${item.port}`,
    };
  });

  const contactResources: Array<Resource> = resources
    .filter(resource => resource.type === 'email')
    .map(emailResource => {
      return {
        alt: "",
        name: emailResource.url,
        type: 'contact',
        url: `mailto:${emailResource.url}`
      };
  });

  const websiteResources: Array<Resource> = [];
  const otherResources: Array<Resource> = [];
  const imageResources: Array<Resource> = screencaps.map(filename => {
    return {
      alt: "",
      name: filename,
      type: 'image',
      url: `/screencaps/login/${filename}`,
    };
  });

const heroImage = screencaps.length > 0 ? `/screencaps/login/${screencaps[0]}` : '/placeholder.png';
</script>

<article>
  <img src={heroImage} alt="" />
  <div>
    <h1>{name}</h1>

    <p class="description">
      {description ?? "There doesn't seem to be any description here..."}
    </p>
  </div>
</article>

<section class="resources">
  <ResourceList title="Hosts" resources={hostResources} />
  <ResourceList title="Contacts" resources={contactResources} />
  <ResourceList title="Websites" resources={websiteResources} />
  <ResourceList title="Other resources" resources={otherResources} />
  <ResourceList title="Other screen captures" resources={imageResources} />
</section>

<style>
section {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  gap: 2rem;
}

article {
  display: flex;
  background-color: rgba(255, 255, 255, 0.05);
}

img {
  max-width: 400px;
}

div {
  padding-inline-start: 2rem;
  padding-inline-end: 2rem;
  padding-block-start: 2rem;
  padding-block-end: 2rem;
}

</style>
