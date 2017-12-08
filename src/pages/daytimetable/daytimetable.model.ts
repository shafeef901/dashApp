export class EventModel {
  subject: string;
  location: string;
  date: EventDate;
}

export class DayTimeTableModel {
  today: Array<EventModel> = [];
}

export class EventDate {
  day: string;
  month: string;
  month_name: string;
  time: string;
  full: string;
}
