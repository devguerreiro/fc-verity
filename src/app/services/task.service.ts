import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../environment';

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

type PaginatedData<T> = {
  page: number;
  page_size: number;
  results: T[];
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpClient = inject(HttpClient);

  tasks = signal<PaginatedData<Task>>({
    page: 1,
    page_size: 10,
    results: [],
    total: 0,
  });

  constructor() {
    this.getTasks().subscribe((data) => this.tasks.set(data));
  }

  getTasks(page?: number, pageSize?: number) {
    return this.httpClient.get<PaginatedData<Task>>(
      `${environment.apiUrl}/task`,
      page && pageSize
        ? {
            params: new HttpParams()
              .set('page', page.toString())
              .set('page_size', pageSize.toString()),
          }
        : {}
    );
  }

  addTask(title: string, description?: string) {
    this.httpClient
      .post<Task>(`${environment.apiUrl}/task/`, { title, description })
      .subscribe((task) => {
        this.tasks.update((tasks) => {
          tasks.results.push(task);
          return {
            ...tasks,
            total: tasks.total + 1,
            results: [...tasks.results],
          };
        });
      });
  }

  editTask(id: number, data: Omit<Task, 'id'>) {
    this.httpClient
      .put<Task>(`${environment.apiUrl}/task/${id}`, data)
      .subscribe((task) => {
        this.tasks.update((tasks) => {
          const taskIndex = tasks.results.findIndex((t) => t.id === id);
          tasks.results[taskIndex] = task;
          return {
            ...tasks,
            results: [...tasks.results],
          };
        });
      });
  }

  deleteTask(id: number) {
    this.httpClient
      .delete<Task>(`${environment.apiUrl}/task/${id}`)
      .subscribe(() => {
        this.tasks.update((tasks) => {
          const taskIndex = tasks.results.findIndex((t) => t.id === id);
          tasks.results.splice(taskIndex, 1);
          return {
            ...tasks,
            total: tasks.total - 1,
            results: [...tasks.results],
          };
        });
      });
  }
}
