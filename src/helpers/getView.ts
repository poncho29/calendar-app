import { View } from "react-big-calendar";

export const isValidView = (value: string): value is View => {
  return ['month', 'week', 'work_week', 'day', 'agenda'].includes(value);
}; 