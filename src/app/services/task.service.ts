import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { environment } from '../../environment';

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpClient = inject(HttpClient);

  tasks = signal<Task[]>([]);

  constructor() {
    this.getTasks().subscribe((tasks) => this.tasks.set(tasks));
  }

  pendingTasks = computed(() => this.tasks().filter((task) => !task.completed));
  completedTasks = computed(() =>
    this.tasks().filter((task) => task.completed)
  );

  getTasks() {
    return this.httpClient.get<Task[]>(`${environment.apiUrl}/task`);
  }

  addTask(title: string, description?: string) {
    this.httpClient
      .post<Task>(`${environment.apiUrl}/task/`, { title, description })
      .subscribe((task) => {
        this.tasks.update((tasks) => {
          tasks.push(task);
          return [...tasks];
        });
      });
  }

  editTask(id: number, data: Omit<Task, 'id'>) {
    this.httpClient
      .put<Task>(`${environment.apiUrl}/task/${id}`, data)
      .subscribe((task) => {
        this.tasks.update((tasks) => {
          const taskIndex = this.tasks().findIndex((t) => t.id === id);
          tasks[taskIndex] = task;
          return [...tasks];
        });
      });
  }

  deleteTask(id: number) {
    this.httpClient
      .delete<Task>(`${environment.apiUrl}/task/${id}`)
      .subscribe(() => {
        this.tasks.update((tasks) => {
          const taskIndex = this.tasks().findIndex((t) => t.id === id);
          tasks.splice(taskIndex, 1);
          return [...tasks];
        });
      });
  }
}
