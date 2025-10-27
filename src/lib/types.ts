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
  link?: string;
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
  hosts?: Host[];
  isClosed?: boolean;
  isConnectable?: boolean;
  location?: string;
  multiWorld?: string;
  name: string;
  notes?: string;
  resources?: Resource[];
  screencaps?: string[];
  textcaps?: string[];
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

export type ActiveTalkerList = {
  dateChecked: string;
  talkers: Talker[];
}
