import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { addHours } from "date-fns";

import { CalendarState } from "../../interfaces";
import { Event } from "../../calendar/interfaces";

const tempEvent = {
  _id: new Date().getTime().toString(),
  title: 'Cumpleaños',
  notas: 'Comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Sebastian'
  }
}

const initialState: CalendarState = {
  events: [tempEvent],
  activeEvent: null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<Event>) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<Event>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<Event>) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent?._id);
        state.activeEvent = null;
      }
    }
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;