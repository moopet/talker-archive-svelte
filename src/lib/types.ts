import type { Snippet } from 'svelte';

export type Codebase = {
  language: string;
  name: string;
  platform?: string;
  repo?: string;
  family?: string;
  shortName: string;
};

export type DataOrigin = {
  name: string;
  shortName: string;
  link?: string;
};

export type Resource = {
  icon?: string;
  name?: string;
  description?: string;
  type: string;
  url: string;
};

export type ResourceItemProps = {
  resource: Resource;
};

export type ResourceListProps = {
  title: string;
  resources: Array<Resource>;
};

export type Host = {
  hostname: string;
  port: number;
};

export type Talker = {
  codebase?: string;
  dataOrigin?: string;
  description?: string;
  disambiguation?: string;
  review?: string;
  location?: string;
  ewtooAbbr?: string;
  hosts?: Array<Host>;
  name: string;
  resources?: Array<Resource>;
  screencaps?: Array<string>;
  textcaps?: Array<string>;
};

export type TalkerCardProps = {
  talkers: Talker;
};

export type TalkerListProps = {
  talkers: Array<Talker>;
};
