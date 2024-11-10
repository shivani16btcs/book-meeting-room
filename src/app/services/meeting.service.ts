import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/meetings`);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.apiUrl}/meetings`, meeting);  
  }

  deleteMeeting(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/meetings/${id}`);
}

  getRooms(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.apiUrl}/rooms`);
  }

  getMeetingsByDate(date: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`/api/meetings?date=${date}`);
  }
}
