import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { DUMMY_USERS } from './users/DUMMY_USERS';
import { Users } from './users/users';

@Component({
  selector: 'app-root',
  imports: [Header, Users],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  users = DUMMY_USERS;

  onSelectUser(id: string) {
    console.log('User was clicked with an id: ' + id);
  }
}
