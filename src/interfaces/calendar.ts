import { Event } from "../calendar/interfaces";

export interface CalendarState {
  events: Event[];
  activeEvent: Event | null;
  isLoadingEvents: boolean;
}