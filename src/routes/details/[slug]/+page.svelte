<script lang="ts">
  import { page } from '$app/state';
  import type { Talker } from '$lib/types';
  import { talkers } from '$lib/data/talkers.json';
  import ResourceList from '$lib/components/ResourceList.svelte';

  const slugify = (text: string): string => text.trim().toLowerCase().replace(/[^a-z0-9]+/, '-');
  const slug = slugify(page.params?.slug ?? "");

  const talker: Talker = talkers.find(talker => slugify(talker.name) === slug);
  console.log({slug, talker});

  const { name, hosts = [], screencaps = [], textcaps = [], description, codebase, ewtooAbbr, resources = [], dataOrigin }: Talker = talker;

  const hostResources: Array<Resource> = hosts.map(item => {
    return {
      alt: "",
      name: `${item.hostname}:${item.port}`,
      type: 'host',
      url: `telnet:${item.hostname}:${item.port}`,
      description: ""
    };
  });

  const contactResources: Array<Resource> = resources
    .filter(resource => resource.type === 'email')
    .map(emailResource => {
      return {
        alt: "",
        name: emailResource.url,
        type: 'contact',
        url: `mailto:${emailResource.url}`,
        description: ""
      };
  });

  const websiteResources: Array<Resource> = resources
    .filter(resource => ['website', 'wayback'].includes(resource.type))
    .map(websiteResource => {
      return {
        alt: "",
        name: websiteResource.type === "wayback" ? `http${websiteResource.url.split("/http")[1]}` : websiteResource.url,
        type: 'website',
        url: websiteResource.url,
        description: websiteResource.type === "wayback" ? "(wayback machine copy)" : ""
      };
  });

  const otherResources: Array<Resource> = [];

  if (ewtooAbbr) {
    otherResources.push({
        alt: "",
        type: 'website',
        name: "Grim's list entry",
        url: `http://list.ewtoo.org/details.cgi?abbr=${ewtooAbbr}`,
        description: ""
    });
  }

  const imageResources: Array<Resource> = screencaps.map(filename => {
    return {
      alt: "",
      name: filename,
      type: 'image',
      url: `/screencaps/login/${filename}`,
      description: ""
    };
  }).slice(1);

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
