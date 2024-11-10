import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookRoomComponent } from './components/book-room/book-room.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookRoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
