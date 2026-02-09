import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { type ToDoTask, type CompleteTask } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private httpClient = inject(HttpClient);

  loadUserTasks(userId: string) {
    return this.httpClient.get<ToDoTask[]>(`${environment.apiBaseUrl}ToDoTask/${userId}`);
  }

  completeUserTask(taskId: string) {
    return this.httpClient.delete<CompleteTask>(`${environment.apiBaseUrl}ToDoTask/${taskId}`);
  }

  addNewUserTask(userId: string, taskDescription: string, dueDate: string, createdAt: string) {
    return this.httpClient.post<ToDoTask>(`${environment.apiBaseUrl}ToDoTask`, {
      userId: userId,
      taskDescription: taskDescription,
      dueDate: dueDate,
      createdAt: createdAt,
    });
  }
}
