import { User } from "../../interfaces";

export interface Event {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: User | undefined;
}