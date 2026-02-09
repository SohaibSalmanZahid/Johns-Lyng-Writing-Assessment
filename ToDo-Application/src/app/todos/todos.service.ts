import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { type ToDoTaskModel, type CompleteTaskModel } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private httpClient = inject(HttpClient);

  loadUserTasks(userId: string) {
    return this.httpClient.get<ToDoTaskModel[]>(`${environment.apiBaseUrl}ToDoTask/${userId}`);
  }

  completeUserTask(taskId: string) {
    return this.httpClient.delete<CompleteTaskModel>(`${environment.apiBaseUrl}ToDoTask/${taskId}`);
  }

  addNewUserTask(userId: string, taskDescription: string, dueDate: string, createdAt: string) {
    return this.httpClient.post<ToDoTaskModel>(`${environment.apiBaseUrl}ToDoTask`, {
      userId: userId,
      taskDescription: taskDescription,
      dueDate: dueDate,
      createdAt: createdAt,
    });
  }
}
