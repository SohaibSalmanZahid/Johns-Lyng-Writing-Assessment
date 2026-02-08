import {
  Component,
  DestroyRef,
  inject,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { Todo } from './todo/todo';
import { AddNewTodo } from './add-new-todo/add-new-todo';
import { NewToDo, ToDoTask } from './todo.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todos',
  imports: [Todo, AddNewTodo],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  @Input({ required: true }) userName!: string;
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) selectedUser!: string;

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  isAddingNewTask = false;
  tasks: ToDoTask[] = [];

  ngOnInit() {
    this.loadUserTasks();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reload tasks whenever selectedUser changes
    if (changes['selectedUser'] && !changes['selectedUser'].firstChange) {
      this.loadUserTasks();
    }
  }

  private loadUserTasks() {
    const subscription = this.httpClient
      .get<ToDoTask[]>('http://localhost:5050/api/ToDoTask/' + this.selectedUser)
      .subscribe({
        next: (resData) => {
          this.tasks = resData;
          console.log(resData);
          this.cdr.detectChanges();
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get todoSubTitle() {
    return this.userName + "'s ToDo List: ";
  }

  get selectedUserTasks() {
    // return this.tasks.filter((task) => task.userId === this.selectedUser);
    return this.tasks;
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
  }

  onStartAddNewToDo() {
    this.isAddingNewTask = true;
  }

  onCancelTask() {
    this.isAddingNewTask = false;
  }

  onSubmitNewTask(newTodo: NewToDo) {
    this.httpClient
      .post<ToDoTask>('http://localhost:5050/api/ToDoTask', {
        userId: this.userId,
        taskDescription: newTodo.taskDescription,
        dueDate: newTodo.dueDate,
        createdAt: newTodo.createdAt,
      })
      .subscribe({
        next: (resData) => {
          this.tasks = [...this.tasks, resData];
          this.cdr.markForCheck();
        },
      });
    this.isAddingNewTask = false;
  }
}
