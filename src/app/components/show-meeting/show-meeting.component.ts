import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meeting.model';

@Component({
  selector: 'app-show-meeting',
  templateUrl: './show-meeting.component.html',
  styleUrls: ['./show-meeting.component.css']
})
export class ShowMeetingComponent  implements OnInit {
  meetings: Meeting[] = [];

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings(): void {
    this.meetingService.getMeetings().subscribe((data) => {
      this.meetings = data;
    });
  }

  deleteMeeting(id: any): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this meeting?')) {
        this.meetingService.deleteMeeting(id).subscribe(() => {
          // Fetch updated list of meetings
          this.loadMeetings();
          console.log(`Meeting with id ${id} deleted`);
        });
      }
    }
  }

}
