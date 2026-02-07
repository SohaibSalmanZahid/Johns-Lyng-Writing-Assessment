import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { DUMMY_USERS } from './users/DUMMY_USERS';
import { Todos } from './todos/todos';
import { Users } from './users/users';
import { UserModel } from './users/user.model';

@Component({
  selector: 'app-root',
  imports: [Header, Todos, Users],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  users = DUMMY_USERS;
  selectedUser = this.users[0];

  onSelectUser(currUser: UserModel) {
    console.log('User was clicked with an id: ' + currUser.userId);
    this.selectedUser = currUser;
  }
}
