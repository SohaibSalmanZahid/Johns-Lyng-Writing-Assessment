import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewToDo } from '../todo.model';

@Component({
  selector: 'app-add-new-todo',
  imports: [FormsModule],
  templateUrl: './add-new-todo.html',
  styleUrl: './add-new-todo.css',
})
export class AddNewTodo {
  @Input({ required: true }) selectedUserId!: string;
  @Output() cancelTask = new EventEmitter();
  @Output() addTodoTask = new EventEmitter<NewToDo>();
  @ViewChild('titleerror') titleError!: ElementRef<HTMLDivElement>;
  @ViewChild('dateerror') dateError!: ElementRef<HTMLDivElement>;

  enteredTodo = '';
  enteredDueDate = '';
  today = new Date().toISOString().split('T')[0];

  onCancelTask() {
    this.cancelTask.emit(false);
  }

  onSubmitNewTask() {
    if (this.enteredTodo.trim() === '') {
      this.titleError.nativeElement.style.display = 'block';
      return;
    }
    if (this.enteredDueDate.trim() === '') {
      this.dateError.nativeElement.style.display = 'block';
      return;
    }

    this.dateError.nativeElement.style.display = 'none';
    this.titleError.nativeElement.style.display = 'none';
    return this.addTodoTask.emit({
      taskDescription: this.enteredTodo,
      createdAt:
        new Date().getFullYear() +
        '-' +
        String(new Date().getMonth() + 1).padStart(2, '0') +
        '-' +
        String(new Date().getDate()).padStart(2, '0'),
      dueDate: this.enteredDueDate,
    });
  }
}
