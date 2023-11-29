export interface Event {
  _id?: string;
  title: string;
  notas: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user?: {
      _id: string;
      name: string;
  }
}