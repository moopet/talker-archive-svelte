<script lang="ts">
  import { page } from '$app/state';
  import type { Codebase, DataOrigin, Talker } from '$lib/types';
  import { getCodebase, getDataOrigins, getMultiWorld, getTalker } from '$lib/database';
  import ResourceList from '$lib/components/ResourceList.svelte';
  import TalkerStatus from '$lib/components/TalkerStatus.svelte';
  import MultiWorld from '$lib/components/MultiWorld.svelte';
  import DuplicateHostList from '$lib/components/DuplicateHostList.svelte';
  import Disclaimer from '$lib/components/Disclaimer.svelte';

  const nullTalker: Talker = {
    name: "Talker not found"
  };

  const talker: Talker = page.params.slug ? getTalker({slug: page.params.slug}) : nullTalker;

  const getCodebaseDescription = (codebaseName: string): string => {
    const codebase = getCodebase(codebaseName);

    if (!codebase) {
      return '';
    }

    let description = "The talker is (was?) based on the codebase, ";

    if (codebase.description) {
      description += `"<abbr title="${codebase.description}">${codebase.name}</abbr>"`;
    }
    else {
      description += `"${codebase.name}"`;
    }

    if (codebase.family) {
      const family = getCodebase(codebase.family);

      if (family.description) {
        description += `, a <abbr title="${family.description}">${family.name}</abbr> derivative`;
      }
      else {
        description += `, a ${family.name} derivative`;
      }
    }

    return `${description}.`;
  };

  const getCitation = (dataOriginNames: string[]): string => {
    const matches = getDataOrigins()
      .filter(x => dataOriginNames.includes(x.shortName))
      .map(x => x.link ? `<a href="${x.link}">${x.name}</a>` : x.name);

    if (matches.length === 0) {
      return '';
    }

    return `Information presented here was - at least in part - sourced from ${matches.join(", and ")}.`;
  };

  const { name, admins = [], coders = [], hosts = [], screencaps = [], textcaps = [], description, aka = [], notes, codebase, ewtooAbbr, resources = [], dataOrigin }: Talker = talker;

  const hostResources: Array<Resource> = hosts.map(item => {
    return {
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

  const otherResources: Array<Resource> = resources
    .filter(resource => resource.type === 'Facebook community');

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

    {#if talker?.adult}
      <p class="adult">For at least some of its run, this talker was open to adults only.</p>
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
        {@html codebaseDescription}
      </p>
    {/if}

    {#if citation}
      <p class="data-origin">
        {@html citation}
      </p>
    {/if}

    {#if talker?.multiWorld}
      <MultiWorld shortName={talker.multiWorld} />
    {/if}

    <DuplicateHostList talker={talker} />

    <Disclaimer />
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
