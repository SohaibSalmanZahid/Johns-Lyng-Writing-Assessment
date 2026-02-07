import { Component, signal } from '@angular/core';
import { Header } from './header/header';
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
  selectedUser?: UserModel;

  onSelectUser(currUser: UserModel) {
    this.selectedUser = currUser;
  }
}
