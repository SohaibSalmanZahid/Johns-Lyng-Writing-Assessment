import { Component, Input } from '@angular/core';
import { type ToDoTask } from './todo.model';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  // @Input({ required: true }) userId!: string;
  // @Input({ required: true }) taskId!: string;
  // @Input({ required: true }) taskDescription!: string;
  // @Input({ required: true }) createdAt!: string;
  // @Input({ required: true }) dueDate!: string;

  @Input({ required: true }) todoTask!: ToDoTask;
  // @Input({ required: true }) selectedUserId!: string;
}
