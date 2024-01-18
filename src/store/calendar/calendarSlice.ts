import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CalendarState } from "../../interfaces";
import { Event } from "../../calendar/interfaces";

const initialState: CalendarState = {
  events: [],
  activeEvent: null,
  isLoadingEvents: true,
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
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event.id !== state.activeEvent?.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.isLoadingEvents = false;
      payload.forEach(event => {
        const exist = state.events.some(dbEvent => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });
    }
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;