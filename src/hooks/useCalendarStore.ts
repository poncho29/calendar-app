import calendarApi from "../api/calendarApi";

import { useAppDispatch, useAppSelector } from "."

import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

import { convertEventsToDate } from "../helpers";

import { Event } from "../calendar/interfaces";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const setActiveEvent = (event: Event) => {
    dispatch(onSetActiveEvent(event))
  }

  const startSavingEvent = async (event: Event) => {
    try {
      if(event.id) {
        await calendarApi.put(`/events/${event.id}`, event);
  
        dispatch(onUpdateEvent({ ...event, user }));
      } else {
        const { data } = await calendarApi.post('/events', event);
  
        if (user && Object.keys(user).length) {
          const owner = { ...user }
    
          dispatch(onAddNewEvent({ ...event, id: data.event.id, user: owner }));
        }
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire('Error al guardar', error?.response?.data?.msg || 'Error', 'error');
    }
  }

  const startDeletingEvent = () => {
    // Llegar al backend

    dispatch(onDeleteEvent());
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDate(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  }

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  }
};
