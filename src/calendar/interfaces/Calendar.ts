export interface Event {
  title: string;
  notas: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
      _id: string;
      name: string;
  }
}