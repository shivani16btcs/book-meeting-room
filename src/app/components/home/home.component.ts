import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meeting.model';
import { ShowMeetingComponent } from '../show-meeting/show-meeting.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  meetings: Meeting[] = [];

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {}

  // Flag to toggle between "Show Meetings" and "Available Rooms"
  isShowingMeetings: boolean = true;

  toggleView(): void {
    this.isShowingMeetings = !this.isShowingMeetings;
  }
}
