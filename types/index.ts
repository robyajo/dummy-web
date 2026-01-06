export type SiteConfig = {
  name: string;
  author: string;
  description: string;
  keywords: Array<string>;
  locale: string;
  type: string;
  publishedTime: string;
  twitterCard: string;
  url: {
    base: string;
    author: string;
  };
  links: {
    github: string;
  };
  ogImage: string;
};
export interface BreadcrumbType {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface FilterUser {
  nik: string;
  nama: string;
  role: string;
  id_posyandu: number;
}
export type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string;
  role: string;
  active: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};
export type Auth = {
  id: number;
  uuid: string;
  role: string;
  active: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};
