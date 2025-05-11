import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { environment } from '../../environment';

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
  httpClient = inject(HttpClient);

  tasks = toSignal(this.getTasks(), { initialValue: [] });

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

  editTask(id: number, data: Partial<Task>) {
    const taskIndex = this.tasks().findIndex((task) => task.id === id);

    this.tasks().splice(taskIndex, 1, { ...this.tasks()[taskIndex], ...data });
  }
}
