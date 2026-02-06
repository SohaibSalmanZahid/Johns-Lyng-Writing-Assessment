import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { DUMMY_USERS } from './users/DUMMY_USERS';
import { Users } from './users/users';
import { Todos } from './todos/todos';

@Component({
  selector: 'app-root',
  imports: [Header, Users, Todos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  users = DUMMY_USERS;
  selectedUser = this.users[0];

  onSelectUser(id: string) {
    console.log('User was clicked with an id: ' + id);
    const newuser = this.users.find((user) => user.userId === id);
    if (newuser) {
      this.selectedUser = newuser;
    }
  }
}
