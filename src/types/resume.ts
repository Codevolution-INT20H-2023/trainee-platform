import { StackList } from '@/types/project';

export interface Resume {
  skills: string[];
  education: string[];
  hobbies: string[];
  stack: StackList[];
  contacts: Contact[];
  personal: PersonalInfo;
  languages: Language[];
  projects: Project[];
  description: string;
  position: string;
}

export enum Language {
  UKRAINIAN = 'Ukrainian',
  ENGLISH = 'English',
  SPANISH = 'Spanish',
}

export interface PersonalInfo {
  age?: number;
  nationality?: string;
  photo?: string;
}

export interface Contact {
  name: string;
  url?: string;
}

export interface Project {
  name: string;
  url: string;
  startDate: Date;
  endDate: Date;
  responsibilities: {
    responsibility: string;
  }[];
}
