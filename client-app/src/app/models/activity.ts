import { Profile } from "./profile";

export interface Activity {
   id: string;
   title: string;
   date: Date | null;
   description: string;
   city: string;
   category: string;
   venue: string;
   hostUsername?: string;
   isHost?: boolean;
   host?: Profile;
   isCancelled?: boolean;
   isGoing?: boolean;
   attendees?: Profile[];

 }