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
    onSetActiveEvent: (state, action: PayloadAction<Event>) => {
      state.activeEvent = action.payload;
    },
  }
});

export const { onSetActiveEvent } = calendarSlice.actions;