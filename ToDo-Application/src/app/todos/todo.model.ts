export interface ToDoTaskModel {
  userId: string;
  taskId: string;
  taskDescription: string;
  createdAt: string;
  dueDate: string;
}

export interface NewToDoModel {
  taskDescription: string;
  createdAt: string;
  dueDate: string;
}

export interface CompleteTaskModel {
  statusCode: string;
  message: string;
  todoTaskId: string;
}
