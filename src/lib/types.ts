export type Social = {
  label: "GitHub" | "Twitter" | "LinkedIn";
  url: string;
};

export type Project = {
  title: string;
  imageUrl: string;
  linkUrl?: string;
  repoUrl?: string;
};

export type SiteSettings = {
  title: string;
  tagline: string;
  email: string;
  intro: string;
  skillsFrontend: string[];
  skillsBackend: string[];
  socials: Social[];
  projects: Project[];
  aboutTitle: string;
  aboutBody: string;
};
