import { useAppDispatch, useAppSelector } from "."

import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

import { Event } from "../calendar/interfaces";
import calendarApi from "../api/calendarApi";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const setActiveEvent = (event: Event) => {
    dispatch(onSetActiveEvent(event))
  }

  const startSavingEvent = async (event: Event) => {
    // TODO: Llegar al backend

    if(event._id) {
      dispatch(onUpdateEvent({ ...event }));
    } else {
      const { data } = await calendarApi.post('/events', event);

      if (user && Object.keys(user).length) {
        const owner = {
          _id: user.uid,
          name: user.name
        }
  
        dispatch(onAddNewEvent({ ...event, _id: data.event.id, user: owner }));
      }
    }
  }

  const startDeletingEvent = () => {
    // Llegar al backend

    dispatch(onDeleteEvent());
  }

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
};
