export type Codebase = {
  language?: string;
  name: string;
  platform?: string;
  repo?: string;
  family?: string;
  shortName: string;
  description?: string;
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
  alt?: string;
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
  port?: number;
  blocked?: boolean;
};

export type Talker = {
  codebase?: string;
  dataOrigins?: Array<string>;
  adult?: boolean;
  description?: string;
  disambiguation?: string;
  notes?: string;
  multiWorld?: string;
  location?: string;
  ewtooAbbr?: string;
  hosts?: Array<Host>;
  name: string;
  admins?: Array<string>;
  coders?: Array<string>;
  aka?: Array<string>;
  resources?: Array<Resource>;
  screencaps?: Array<string>;
  textcaps?: Array<string>;
};

export type MultiWorldProps = {
  shortName: string;
};

export type TalkerCardProps = {
  talkers: Talker;
};

export type TalkerListProps = {
  talkers: Array<Talker>;
};
