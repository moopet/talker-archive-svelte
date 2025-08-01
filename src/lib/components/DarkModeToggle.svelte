<script lang="ts">
import { browser } from '$app/environment';
import Icon from '$lib/assets/icons/dark-mode.png';

const defaultColorMode: string = 'dark';

const getBrowserColorMode = (): string => {
  if (!browser) {
    return defaultColorMode;
  }

  if (window.localStorage) {
    const userSavedMode = window.localStorage.getItem('dark-mode');

    if (userSavedMode) {
      return userSavedMode;
    }
  }

  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }

  return defaultColorMode;
};

let isDarkMode: boolean = $state(getBrowserColorMode() === 'dark');

$effect(() => {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    window.localStorage.setItem('dark-mode', 'dark');
  }
  else {
    document.body.classList.remove('dark-mode');
    window.localStorage.setItem('dark-mode', 'light');
  }
});
</script>

<div data-requires-js>
  <img class="icon" src={Icon} alt="" />
  <input id="dark-mode-toggle" type="checkbox" bind:checked={isDarkMode} />
  <label for="dark-mode-toggle">Dark mode</label>
</div>

<style>
div {
  display: flex;
  align-items: center;
  margin-inline-start: 1rem;
  margin-inline-end: 1rem;
  padding-inline-start: 0.2rem;
  padding-inline-end: 0.2rem;
}

input {
  opacity: 0;
	height: 0;
	width: 0;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 46px;
	height: 26px;
	background-color: var(--color-toggle-track-off, #aaa);
	display: block;
	border-radius: 25px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 3px;
	left: 4px;
	width: 20px;
	height: 20px;
	background-color: var(--color-toggle-switch-off, #333);
	border-radius: 25px;
	transition: 0.3s;
}

.icon {
  width: 25px;
  height: 25px;
}

input:checked + label {
	background-color: var(--color-toggle-track-on, #333);
}

input:checked + label:after {
	left: calc(100% - 3px);
	background-color: var(--color-toggle-switch-on, #aaa);
	transform: translateX(-100%);
}

div:focus-within {
  outline: medium auto currentColor;
}

label:active:after {
	width: 30px;
}
</style>
