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
  port?: number | null;
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
  hostname?: string;
  isClosed?: boolean;
  isConnectable?: boolean;
  language?: string
  location?: string;
  multiWorld?: string;
  name: string;
  notes?: string;
  port?: number;
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
  talker: Talker;
};

export type MultiWorldProps = {
  shortName: string;
};

export type TalkerCardProps = {
  talker: Talker;
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
  url?: string;
};

export type MultiWorld = {
  description?: string;
  name: string;
  shortName: string;
  url?: string;
};

export type ActiveTalkerList = {
  dateChecked: string;
  talkers: Talker[];
}
