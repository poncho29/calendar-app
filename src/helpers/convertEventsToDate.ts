import { parseISO } from "date-fns"

import { Event } from "../calendar/interfaces"

export const convertEventsToDate = (events: Event[] = []) => {
  return events.map(event => {
    event.start = parseISO(event.start.toString());
    event.end = parseISO(event.end.toString());

    return event;
  })
}