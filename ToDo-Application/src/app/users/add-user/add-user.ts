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
    if (this.enteredUsername.trim() !== '') {
      this.username.emit(this.enteredUsername);
    }
    this.enteredUsername = '';
  }
}
