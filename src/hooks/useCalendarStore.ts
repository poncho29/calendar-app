import { useAppDispatch, useAppSelector } from "."

import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

import { Event } from "../calendar/interfaces";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const setActiveEvent = (event: Event) => {
    dispatch(onSetActiveEvent(event))
  }

  const startSavingEvent = async (event: Event) => {
    // TODO: Llegar al backend

    if(event._id) {
      dispatch(onUpdateEvent({ ...event }));
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
    startSavingEvent,
  }
};
