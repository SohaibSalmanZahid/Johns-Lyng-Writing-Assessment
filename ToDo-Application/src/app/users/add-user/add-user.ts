import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  @Output() username = new EventEmitter<string>();
  @ViewChild('nameerror') nameError!: ElementRef<HTMLDivElement>;

  enteredUsername = '';

  onAddNewUser() {
    if (this.enteredUsername.trim() !== '') {
      this.username.emit(this.enteredUsername);
      this.nameError.nativeElement.style.display = 'none';
      this.enteredUsername = '';
    } else {
      this.nameError.nativeElement.style.display = 'block';
    }
  }
}
