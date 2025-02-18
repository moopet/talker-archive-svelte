# Talker Archive

This is the talker archive website which currently lives on a Vercel "hobby" instance running on [talkers.moopet.net](https://talkers.moopet.net).

It's a catalogue of ew-too/NUTS-style talkers from the early '90s to today. It's not intended to be up-to-date, it's for whatchacallit, _posterity_.

This is partly a Real Thing and partly me learning React, Next, etc. so I don't imagine the code is particularly good, but I intend to iterate on it and refactor a lot without changing the basic functionality.

~~It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)~~.

It's now a SvelteKit project, again partially so I can learn Svelte and partially because I consider React to be legacy stuff we should avoid, and the "UI toolkit" I was using was pretty gross.

## Data source

The data which drives everything lives in src/lib/data/talkers.json, and there are also some original vintage text captures under static/textcaps/.
