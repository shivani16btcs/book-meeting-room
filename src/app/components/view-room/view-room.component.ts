import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { Room } from '../../models/room.model';
import { Meeting } from '../../models/meeting.model'; // Assuming a Meeting model

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
})
export class ViewRoomComponent implements OnInit {
  rooms: Room[] = [];
  meetings: Meeting[] = [];
  selectedDate: string = '';  // This will store the selected date

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadMeetings();
  }

  // Load all rooms from the service
  loadRooms(): void {
    this.meetingService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  // Load all meetings (bookings) to determine availability
  loadMeetings(): void {
    this.meetingService.getMeetings().subscribe((meetings) => {
      this.meetings = meetings;
    });
  }

  // Helper function to determine available times for a room on a specific date
  getAvailableTimes(room: string): string[] {
    const roomMeetings = this.meetings.filter(
      (meeting) => meeting.room === room && meeting.date === this.selectedDate
    );
    const availableTimes: string[] = [];
    const allTimes = this.generateTimeOptions();

    allTimes.forEach((time) => {
      const isBooked = roomMeetings.some(
        (meeting) => meeting.startTime <= time && meeting.endTime > time
      );
      if (!isBooked) {
        availableTimes.push(time);
      }
    });

    return availableTimes;
  }

  // Generate all available time slots (9:00 AM to 6:00 PM, 30-minute increments)
  private generateTimeOptions(): string[] {
    const startHour = 9;
    const endHour = 18;
    const incrementMinutes = 30;
    const timeOptions: string[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += incrementMinutes) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        timeOptions.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return timeOptions;
  }

  // Method to filter room availability based on the selected date
  filterByDate(): void {
    // Optionally, you could reset the available times when the date changes.
    // This will automatically refresh the available times after a date is selected.
  }


  chunkArray(array: string[], chunkSize: number): string[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
}
