import type { Snippet } from 'svelte';

export type ResourceItemProps = {
  resource: Resource;
};

export type ResourceListProps = {
  title: string;
  resources: Array<Resource>;
};

export type Talker = {
  codebase?: string;
  dataOrigin?: string;
  description?: string;
  disambiguation?: string;
  notes?: string;
  location?: string;
  ewtooAbbr?: string;
  hosts?: Array<Host>;
  name: string;
  admins?: Array<string>;
  aka?: Array<string>;
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
