import {
  Component,
  DestroyRef,
  inject,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo/todo';
import { AddNewTodo } from './add-new-todo/add-new-todo';
import { completeTask, NewToDo, ToDoTask } from './todo.model';
import { environment } from '../../environments/environment';
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
    if (changes['selectedUser'] && !changes['selectedUser'].firstChange) {
      this.tasks = [];
      this.loadUserTasks();
    }
  }

  private loadUserTasks() {
    const subscription = this.httpClient
      .get<ToDoTask[]>(`${environment.apiBaseUrl}ToDoTask/${this.userId}`)
      .subscribe({
        next: (resData) => {
          this.tasks = resData;
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
    return this.tasks;
  }

  onCompleteTask(taskId: string) {
    this.httpClient.delete<completeTask>(`${environment.apiBaseUrl}ToDoTask/${taskId}`).subscribe();

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
      .post<ToDoTask>(`${environment.apiBaseUrl}ToDoTask`, {
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
