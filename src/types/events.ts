export interface EventSpeaker {
  name: string;
  title: string;
  photo: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    luma?: string;  
  };
}

export interface Event {
  id: string;
  topic: string;
  date: string | null;
  time: string;
  location: string;
  speakers: EventSpeaker[];
  url?: string;    
  featured?: boolean;
  isPast?: boolean;
  photo?: string;
}
