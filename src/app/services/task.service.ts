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
    return this.httpClient.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  addTask(title: string, description?: string) {
    this.tasks().push({
      id: this.tasks().length,
      title,
      description,
      completed: false,
    });
  }

  deleteTask(id: number) {
    const taskIndex = this.tasks().findIndex((task) => task.id === id);
    this.tasks().splice(taskIndex, 1);
  }

  editTask(id: number, data: Omit<Task, 'id'>) {
    this.httpClient
      .put<Task>(`${environment.apiUrl}/tasks/${id}`, data)
      .subscribe((task) => {
        this.tasks.update((tasks) => {
          const taskIndex = this.tasks().findIndex((t) => t.id === id);
          tasks[taskIndex] = task;
          return [...tasks];
        });
      });
  }
}
