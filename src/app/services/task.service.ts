import { Injectable } from '@angular/core';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = [] as Task[];

  addTask(title: string, description?: string) {
    this.tasks.push({
      id: this.tasks.length,
      title,
      description,
      completed: false,
    });
  }

  deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    this.tasks.splice(taskIndex, 1);
  }

  editTask(id: number, data: Partial<Task>) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    this.tasks.splice(taskIndex, 1, { ...this.tasks[taskIndex], ...data });
  }

  getCompletedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  getPendingTasks() {
    return this.tasks.filter((task) => !task.completed);
  }
}
