import { useAppDispatch, useAppSelector } from "."

import { onAddNewEvent, onSetActiveEvent } from "../store";

import { Event } from "../calendar/interfaces";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  const setActiveEvent = (event: Event) => {
    dispatch(onSetActiveEvent(event))
  }

  const startSavingEvent = async (event: Event) => {
    // TODO: Llegar al backend

    if(event._id) {
      // Pending
    } else {
      dispatch(onAddNewEvent({ ...event, _id: new Date().getTime().toString() }));
    }
  }

  return {
    // Properties
    events,
    activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent
  }
};
