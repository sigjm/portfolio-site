export type SectionId = 'intro' | 'about' | 'skills' | 'projects' | 'contact';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};
