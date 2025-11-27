import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
  const currentUrl = `${url.protocol}//${url.host}${url.pathname}${url.search}`;

  return {
    currentUrl
  };
};
