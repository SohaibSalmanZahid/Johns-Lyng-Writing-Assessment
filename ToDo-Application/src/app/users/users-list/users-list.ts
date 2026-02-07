import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {
  @Input({ required: true }) user!: UserModel;
  @Output() selectedUser = new EventEmitter();

  onSelectedUser() {
    this.selectedUser.emit(this.user);
  }
}
