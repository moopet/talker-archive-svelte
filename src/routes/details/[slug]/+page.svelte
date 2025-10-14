<script lang="ts">
  import { page } from '$app/state';
  import slugify from 'slugify';
  import type { Codebase, DataOrigin, Talker } from '$lib/types';
  import { findTalkerBySlug } from '$lib/utils.ts';
  import { codebases, dataOrigins, talkers } from '$lib/data/talkers.json';
  import ResourceList from '$lib/components/ResourceList.svelte';
  import TalkerStatus from '$lib/components/TalkerStatus.svelte';

  const nullTalker = {
    name: "Talker not found"
  };

  const talker: Talker = findTalkerBySlug(page.params?.slug ?? "") ?? nullTalker;

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

  const getCitation = (dataOriginNames: string[]): string => {
    console.log(dataOriginNames);
    const matches: DataOrigin[] = dataOriginNames
      .map(dataOriginName => dataOrigins.find(item => item.shortName.toLowerCase() === dataOriginName.toLowerCase()))
      .filter(x => x)
      .map(dataOrigin => dataOrigin.link ? `<a href="${dataOrigin.link}">${dataOrigin.name}</a>` : dataOrigin.name);
      console.log(matches);


    if (matches.length === 0) {
      return '';
    }

    return `Information presented here was - at least in part - sourced from ${matches.join(", and ")}.`;
  };

  const { name, admins = [], coders = [], hosts = [], screencaps = [], textcaps = [], description, aka = [], notes, codebase, ewtooAbbr, resources = [], dataOrigin }: Talker = talker;

  const hostResources: Array<Resource> = hosts.map(item => {
    return {
      alt: "",
      name: item?.port ? `${item.hostname}:${item.port}` : item.hostname,
      type: 'host',
      url: item?.port ? `telnet:${item.hostname}:${item.port}` : `telnet:${item.hostname}`,
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

  const staffResources: Array<Resource> = [
   ...admins.filter(item => coders.includes(item)).sort().map(item => ({ type: 'admin/coder', name: item, url: `/spods/${item.toLowerCase()}`})),
   ...admins.filter(item => !coders.includes(item)).sort().map(item => ({ type: 'admin', name: item, url: `/spods/${item.toLowerCase()}`})),
   ...coders.filter(item => !admins.includes(item)).sort().map(item => ({ type: 'coder', name: item, url: `/spods/${item.toLowerCase()}`})),
  ];

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
      url: `/screencaps/${filename}`,
      description: ""
    };
  }).slice(1);

  const heroImage = screencaps.length > 0 ? `/screencaps/${screencaps[0]}` : '/placeholder.png';
  const citation = getCitation(talker?.dataOrigins ?? []);
  const codebaseDescription = getCodebaseDescription(talker?.codebase ?? '');
</script>

{#if talker}
  <TalkerStatus talker={talker} />

  <section class="hero">
    <img src={heroImage} alt="" />
    <div>
      <h1>{name}</h1>

      <p class="description">
        {@html description ?? "There doesn't seem to be any description here..."}
      </p>
    </div>
  </section>

  <section class="information">
    {#if talker?.disambiguation}
      <p class="disambiguation">
        {@html talker?.disambiguation}
      </p>
    {/if}

    {#if aka.length > 0}
      <p class="aka">Also known as {aka.map(name => `"${name}"`).join(', ')}.</p>
    {/if}

    {#if notes}
      <p class="notes">
        {@html notes}
      </p>
    {/if}

    {#if codebaseDescription}
      <p>
        {codebaseDescription}
      </p>
    {/if}

    {#if citation}
      <p class="data-origin">
        {@html citation}
      </p>
    {/if}

    <p class="disclaimer">
      It's <em>highly</em> likely that most of the links presented here haven't worked for years.
    </p>
  </section>

  <section class="resources">
    <ResourceList title="Hosts" resources={hostResources} />
    <ResourceList title="Staff" resources={staffResources} />
    <ResourceList title="Websites" resources={websiteResources} />
    <ResourceList title="Other resources" resources={otherResources} />
    <ResourceList title="Other screen captures" resources={imageResources} />
  </section>
{:else}
  <h1>Talker not found</h1>
{/if}

<style>
section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  text-align: start;

  :global {
    br {
      margin-block-end: 0.5rem;
    }
  }
}

@media(max-width: 640px) {
  section img {
    max-width: 100%;
  }
}

@media(min-width: 1024px) {
  section {
    flex-direction: row;
  }
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

  .notes {
    padding-block-end: 1rem;
    border-inline-start-width: 0;
    border-inline-end-width: 0;
    border-block-start-width: 0;
    border-block-end-width: 1px;
    border-style: solid;
    border-color: var(--border-color);
  }

  .disambiguation {
    font-style: italic;
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
