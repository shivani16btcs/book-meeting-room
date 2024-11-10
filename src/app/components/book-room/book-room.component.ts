import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meeting.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css'],
})
export class BookRoomComponent implements OnInit {
  newMeeting: Meeting = {
    username: 'monkey man',
    room: '',
    date: '',
    startTime: '',
    endTime: '',
    agenda: '',
    status: 'Booked',
  };

  rooms: { id: number; name: string }[] = [];
  timeOptions: string[] = [];
  availableEndTimes: string[] = [];

  constructor(private meetingService: MeetingService, private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
    this.generateTimeOptions();
  }

  loadRooms(): void {
    this.meetingService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  // Helper function to generate time options in 30-minute increments from 9:00 AM to 6:00 PM
  private generateTimeOptions(): void {
    const startHour = 9;
    const endHour = 18;
    const incrementMinutes = 30;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += incrementMinutes) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        const time = `${formattedHour}:${formattedMinute}`;

        if (!(hour === endHour && minute > 0)) {
          this.timeOptions.push(time);
        }
      }
    }
  }

  // Update the available end times based on the selected start time
  updateEndTimes(): void {
    if (!this.newMeeting.startTime) return;

    const startIndex = this.timeOptions.indexOf(this.newMeeting.startTime);
    const remainingTimes = this.timeOptions.slice(startIndex + 1); // Only times after the start time

    this.availableEndTimes = remainingTimes;
    if (!this.availableEndTimes.includes(this.newMeeting.endTime)) {
      this.newMeeting.endTime = ''; // Reset end time if it's not valid
    }
  }

  bookMeeting(): void {
    const meetingDate = new Date(this.newMeeting.date);
    const [startHour, startMinute] = this.newMeeting.startTime.split(':').map(Number);
    const [endHour, endMinute] = this.newMeeting.endTime.split(':').map(Number);
    const startTime = new Date(meetingDate);
    const endTime = new Date(meetingDate);
    startTime.setHours(startHour, startMinute);
    endTime.setHours(endHour, endMinute);

    // Check if the meeting duration is at least 30 minutes
    const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    if (durationMinutes < 30) {
      alert('Meeting duration should be at least 30 minutes.');
      return;
    }

    this.meetingService.addMeeting(this.newMeeting).subscribe(() => {
      alert('Meeting booked successfully!');
      this.router.navigate(['/']);
    });
  }
}
