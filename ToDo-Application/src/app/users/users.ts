import { Component, EventEmitter, Output } from '@angular/core';
import { AddUser } from './add-user/add-user';
import { DUMMY_USERS } from './DUMMY_USERS';
import { UsersList } from './users-list/users-list';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  imports: [AddUser, UsersList],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  users = DUMMY_USERS;
  selectedUser = this.users[0];

  @Output() currentUser = new EventEmitter();

  onNewUser(username: string) {
    this.users.push({
      userId: new Date().getMilliseconds().toString(),
      userName: username,
    });
  }

  onSelectUser(user: UserModel) {
    console.log('User was clicked with an id: ' + user.userId);
    const newuser = this.users.find((nuser) => nuser.userId === user.userId);
    if (newuser) {
      this.selectedUser = newuser;
      this.currentUser.emit(user);
    }
  }
}
