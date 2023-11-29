import { useEffect, useState } from 'react'
import { Calendar, EventPropGetter, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// import { addHours } from 'date-fns'

import { getMessagesEs, isValidView, localizer } from '../../helpers'

import { CalendarEvent, CalendarModal, Navbar } from ".."

import { useCalendarStore, useUiStore } from '../../hooks'

import { Event } from '../interfaces'

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState<View>('week');

  useEffect(() => {
    const storage = localStorage.getItem('lastView');
    if (storage && isValidView(storage)) {
      setLastView(storage);
    }
  }, []);


  const eventStyleGetter: EventPropGetter<Event> = () => {
    // console.log(event);

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      className: '',
      style
    }
  }

  const onDoubleClick = (event: Event) => {
    console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = (event: Event) => {
    console.log({ click: event });
    setActiveEvent(event);
  }

  const onViewChanged = (view: View) => {
    localStorage.setItem('lastView', view);
    setLastView(view);
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        startAccessor="start"
        endAccessor="end"
        defaultView={lastView}
        events={events}
        localizer={localizer}
        style={{ height: 'calc(100vh - 56px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        components={{
          event: CalendarEvent
        }}
      />

      <CalendarModal />
    </>
  )
}
