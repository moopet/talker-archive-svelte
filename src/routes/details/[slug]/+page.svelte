<script lang="ts">
  import { page } from '$app/state';
  import slugify from 'slugify';
  import type { Codebase, DataOrigin, Talker } from '$lib/types';
  import { codebases, dataOrigins, talkers } from '$lib/data/talkers.json';
  import ResourceList from '$lib/components/ResourceList.svelte';

  const slug: string = slugify(page.params?.slug ?? "", {lower: true});
  const talker: Talker = talkers.find(talker => slugify(talker.name, {lower: true}) === slug);

  const getCodebaseDescription = (codebaseName: string): string => {
    const codebase: Codebase = codebases.find(item => item.shortName.toLowerCase() === codebaseName.toLowerCase());

    if (!codebase) {
      return '';
    }

    let codebaseDescription: string = `The talker is (was?) based on the codebase, "${codebase.name}"`;

    if (codebase?.family?.name) {
      codebaseDescription += `, a ${codebase.family.name} derivative`;
    }

    return `${codebaseDescription}.`;
  };

  const getCitation = (dataOriginName: string): string => {
    const dataOrigin: DataOrigin = dataOrigins.find(item => item.shortName.toLowerCase() === dataOriginName.toLowerCase());

    if (!dataOrigin) {
      return '';
    }

    const link = dataOrigin.link ? `<a href="${dataOrigin.link}">${dataOrigin.name}</a>` : dataOrigin.name;

    return `Information presented here was - at least in part - sourced from ${link}.`;
  };

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
  const citation = getCitation(talker?.dataOrigin ?? '');
  const codebaseDescription = getCodebaseDescription(talker?.codebase ?? '');
</script>

<section class="hero">
  <img src={heroImage} alt="" />
  <div>
    <h1>{name}</h1>

    <p class="description">
      {description ?? "There doesn't seem to be any description here..."}
    </p>
  </div>
</section>

<section class="information">
  {#if codebaseDescription}
    <p>
      {codebaseDescription}
    </p>
  {/if}

  {#if citation}
    <p>
      {@html citation}
    </p>
  {/if}

  <p>
    It's <em>highly</em> likely that most of the links presented here haven't worked for years.
  </p>
</section>

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
  text-align: start;
}

.hero {
  padding-block-start: 0;
  padding-block-end: 0;
  background-color: var(--card-background-color);
}

.information {
  flex-direction: column;

  p {
    margin-block-end: 0;
  }
}

.resources {
  gap: 2rem;
}

img {
  max-width: 400px;
}

div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-inline-start: 2rem;
  padding-inline-end: 2rem;
}

h1 {
  margin-block-end: 0;
}
</style>
