export type Codebase = {
  description?: string;
  family?: string;
  language?: string;
  name: string;
  platform?: string;
  repo?: string;
  shortName: string;
};

export type DataOrigin = {
  url?: string;
  name: string;
  shortName: string;
};

export type Resource = {
  alt?: string;
  description?: string;
  icon?: string;
  name?: string;
  type: string;
  url: string;
  broken?: boolean;
};

export type ResourceItemProps = {
  resource: Resource;
};

export type ResourceListProps = {
  resources: Resource[];
  title: string;
};

export type Host = {
  blocked?: boolean;
  hostname: string;
  port?: number;
};

export type Talker = {
  admins?: string[];
  ageRestriction?: string;
  aka?: string[];
  codebase?: string;
  coders?: string[];
  dataOrigins?: string[];
  description?: string;
  disambiguation?: string;
  ewtooAbbr?: string;
  group?: string;
  hosts?: Host[];
  isClosed?: boolean;
  isConnectable?: boolean;
  location?: string;
  multiWorld?: string;
  name: string;
  notes?: string;
  resources?: Resource[];
  role?: string;
  screencaps?: string[];
  slug?: string;
  textcaps?: string[];
  yearClosed?: number;
  yearOpened?: number;
};

export type GroupProps = {
  shortName: string;
};

export type MultiWorldProps = {
  shortName: string;
};

export type TalkerCardProps = {
  talkers: Talker;
};

export type TalkerListProps = {
  talkers: Talker[];
};

export type GetTalkerParams = {
  slug?: string;
  name?: string;
};

export type GetTalkersParams = {
  order?: 'asc' | 'desc';
  codebase?: string;
  dataOrigin?: string;
  group?: string;
  multiWorld?: string;
  host?: {
    hostname: string;
    port?: number;
  };
};

export type Group = {
  description?: string;
  name?: string;
  shortName: string;
};

export type MultiWorld = {
  description?: string;
  name: string;
  shortName: string;
};

export type ActiveTalkerList = {
  dateChecked: string;
  talkers: Talker[];
}
