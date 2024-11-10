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
    username: '',
    room: '',
    date: '',
    startTime: '',
    endTime: '',
    agenda: '',
    status: 'Booked',
  };

  // Room list to populate the dropdown
  rooms: { id: number; name: string }[] = [];

  constructor(private meetingService: MeetingService, private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.meetingService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  bookMeeting(): void {
    this.meetingService.addMeeting(this.newMeeting).subscribe(() => {
      alert('Meeting booked successfully!');
      this.router.navigate(['/']);
    });
  }
}
