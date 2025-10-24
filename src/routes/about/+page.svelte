<section>
  <h1>F.A.Q. about this project</h1>

  <h2>Does this list contain MUDs?</h2>
  <p>Sometimes. A few. But they have to be talker-style MUDs, i.e. MUDs that are primarly used for social chat.</p>
  <p>If you think one is here by mistake, report it.</p>
  <p>There's a similar project out there called the <a href="https://mudmuseum.com">MudMuseum</a> which will help out if it's MUDding you're after.</p>

  <h2>How come most of these talkers don't have any description or other info?</h2>
  <p>It's mostly a manual process, looking things up on the Wayback machine. Sometimes I can't find anything beyond a single reference to a talker.</p>
  <p>Hopefully more will get fleshed out as time goes by.</p>

  <h2>Some talkers change their name over time, don't they?</h2>
  <p>Yes, and I've tried to add notes and links about that but it's a bit like sewing with spaghetti.</p>
  <p>Unfortunately, there <em>will</em> be duplicates here. There will also be talkers with the same name that I've accidentally lumped together.</p>

  <h2>Is there an API?</h2>
  <p>
    If you want a list of active talkers in JSON format, you can get it from <a href="https://talkers.moopet.net/api/active-talkers">/api/active-talkers</a>.
    This may or may not be particularly up-to-date.
  </p>

  <p>
    If you want the raw data for all the talkers, look in the <a href="https://github.com/moopet/talker-archive-svelte/blob/main/src/lib/data/talkers.json">talkers.json file in the repository</a>.
  </p>

  <h2>How can I help out?</h2>
  <p>
    This is work in progress.<br>
    A lot of links are from the Wayback Machine or my own memory. A lot of info might simply be <em>wrong</em>.
  </p>

  <p>
    If you have a correction to any of the info here, want something removed or updated... or you know about a talker I've missed, I'd love to hear from you.
  </p>

  <p>
    Drop me a line at <a href="mailto:ben@moopet.net">ben@moopet.net</a> or raise an issue on the <a href="https://github.com/moopet/talker-archive-svelte/issues">GitHub repository</a>.
  </p>

  <h2>I want to run my own talker. Where do I get started?</h2>
  <p>Most talker source code has been archived at <a href="https://talkersource.com/">TalkerSource.com</a>. Some codebases might run on modern operating systems, but you might need a programming background in C to get them working.</p>
  <p>If you want a quick taste of what it's like to have a talker, you can run Zefram's <a href="https://www.fysh.org/~zefram/eht/">Emergency Holographic Talker</a> on anything with Perl.</p>

  <h2>How do I get in touch with [spod]?</h2>
  <p>I probably can't help you there.</p>
  <p>Until recently there have been a few bigger Facebook groups that would help out, but that feature is being shut down.</p>
</section>

<style>
h1 {
  margin-block-end: 3rem;
}

p + h2 {
  margin-block-start: 4rem;
}

section {
  text-align: left;
}

section + section {
  padding-block-start: 0;
}

h2 {
  color: rgb(179, 160, 125);
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 1px;
  border-style: solid;
  border-color: var(--border-color);
}
</style>
