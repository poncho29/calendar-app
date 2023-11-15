import { Calendar, EventPropGetter } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'

import { getMessagesEs, localizer } from '../../helpers'

import { CalendarEvent, Navbar } from ".."

import { Event } from '../interfaces'

const events = [{
  title: 'Cumpleaños',
  notas: 'Comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Sebastian'
  }
}]

export const CalendarPage = () => {
  const eventStyleGetter: EventPropGetter<Event> = (event) => {
    console.log(event);

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

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        startAccessor="start"
        endAccessor="end"
        events={events}
        localizer={localizer}
        style={{ height: 'calc(100vh - 56px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
      />
    </>
  )
}
