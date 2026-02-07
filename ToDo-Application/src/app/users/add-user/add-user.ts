import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  @Output() username = new EventEmitter<string>();

  enteredUsername = '';

  onAddNewUser() {
    this.username.emit(this.enteredUsername);
    this.enteredUsername = '';
  }
}
