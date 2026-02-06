import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) userName!: string;
  @Output() selectedUser = new EventEmitter<string>();

  onSelectedUser() {
    this.selectedUser.emit(this.userId);
  }
}
