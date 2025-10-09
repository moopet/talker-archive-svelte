<header>
  <div class="home">
    <a aria-labelledby="home-navigation" href="/"><svg focusable="false" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path></svg></a>
    <h1 id="home-navigation">Talker archive</h1>
  </div>

  <nav>
    <a href="/resources">Resources</a>
  </nav>
</header>

<style>
header {
  display: flex;
  justify-content: flex-end;
  background-color: var(--card-background-color);
  padding-inline-start: 1.5rem;
  padding-inline-end: 1.5rem;
  padding-block-start: 1rem;
  padding-block-end: 1rem;
}

.home {
  flex-grow: 1;
}

div {
  display: flex;
}

h1 {
  margin-inline-start: 0.5rem;
  margin-block-start: 0;
  margin-block-end: 0;
  display: inline-block;
  font-size: 1rem;
  font-weight: normal;
}

svg {
  width: 1.5rem;
  color: var(--link-color);
}

a {
  display: inline-block;
}
</style>
