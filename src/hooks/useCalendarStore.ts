import { useAppDispatch, useAppSelector } from "."

import { onSetActiveEvent } from "../store";

import { Event } from "../calendar/interfaces";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  const setActiveEvent = (event: Event) => {
    dispatch(onSetActiveEvent(event))
  }

  return {
    // Properties
    events,
    activeEvent,

    // Methods
    setActiveEvent
  }
};
