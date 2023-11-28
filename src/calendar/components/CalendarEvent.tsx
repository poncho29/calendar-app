
import { Event } from '../interfaces'

import { EventProps } from "react-big-calendar"


export const CalendarEvent = (props: EventProps<Event>) => {
  const { title, user } = props.event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
