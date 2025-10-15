<section>
  <h1>F.A.Q. about this project</h1>

  <h2>Does this list contain MUDs?</h2>
  <p>Sometimes. A few. But they have to be talker-style MUDs, i.e. MUDs that are primarly used for social chat.</p>
  <p>If you think one is here by mistake, report it.</p>

  <h2>Some talkers change their name over time, don't they?</h2>
  <p>Yes, and I've tried to add notes and links about that but it's a bit like sewing with spaghetti.</p>

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
  border-inline-start-width: 0;
  border-inline-end-width: 0;
  border-block-start-width: 0;
  border-block-end-width: 1px;
  border-style: solid;
  border-color: var(--border-color);
}
</style>
