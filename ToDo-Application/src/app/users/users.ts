import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type User } from './user.model';
@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  // @Input({ required: true }) userId!: string;
  // @Input({ required: true }) userName!: string;
  @Input({ required: true }) user!: User;
  @Output() selectedUser = new EventEmitter<string>();

  onSelectedUser() {
    this.selectedUser.emit(this.user.userId);
  }
}
