import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BookRoomComponent } from './components/book-room/book-room.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowMeetingComponent } from './components/show-meeting/show-meeting.component'; // Import HttpClientModule for HTTP requests

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookRoomComponent,
    ViewRoomComponent,
    ShowMeetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule here
    HttpClientModule, // Add HttpClientModule for API calls
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
