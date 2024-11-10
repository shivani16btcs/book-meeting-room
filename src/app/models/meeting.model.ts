export interface Meeting {
    id?: number;
    username: string;
    room: string;
    date: string;
    startTime: string;
    endTime: string;
    agenda: string;
    status: 'Available' | 'In-Use' | 'Booked';
  }