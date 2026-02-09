export interface ToDoTask {
  userId: string;
  taskId: string;
  taskDescription: string;
  createdAt: string;
  dueDate: string;
}

export interface NewToDo {
  taskDescription: string;
  createdAt: string;
  dueDate: string;
}

export interface CompleteTask {
  statusCode: string;
  message: string;
  todoTaskId: string;
}
