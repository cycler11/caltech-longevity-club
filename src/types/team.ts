export interface TeamMemberLinks {
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  links: TeamMemberLinks;
}

export interface AdvisorConsultant {
  name: string;
  role: string;
  image: string;
  links: TeamMemberLinks;
  summary: string;
  fullText: string;
}
