import { Component, Input } from '@angular/core';
import { Todo } from './todo/todo';
import { DUMMY_TODOS } from './DUMMY_TODOS';

@Component({
  selector: 'app-todos',
  imports: [Todo],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  @Input({ required: true }) userName!: string;
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) selectedUser!: string;

  tasks = DUMMY_TODOS;

  get todoSubTitile() {
    return this.userName + "'s ToDo List: ";
  }

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.selectedUser);
  }
}
