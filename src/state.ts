import { atom } from 'recoil';

import type { Project, SectionId } from './types';

export const activeSectionState = atom<SectionId>({
  key: 'activeSectionState',
  default: 'intro',
});

export const projectsState = atom<Project[]>({
  key: 'projectsState',
  default: [],
});
