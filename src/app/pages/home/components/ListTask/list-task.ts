import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Task, TaskService } from '../../../../services/task.service';
import { EditTaskDialogComponent } from '../EditTaskDialog/edit-task-dialog';

@Component({
  selector: 'list-task',
  imports: [MatIconModule, MatCheckboxModule, MatPaginatorModule, CommonModule],
  templateUrl: './list-task.html',
})
export class ListTaskComponent {
  taskService = inject(TaskService);

  readonly dialog = inject(MatDialog);

  openEditTaskDialog(task: Task): void {
    this.dialog.open(EditTaskDialogComponent, {
      width: '250px',
      data: task,
    });
  }

  changeTaskCompleted(task: Task) {
    this.taskService.editTask(task.id, {
      ...task,
      completed: !task.completed,
    });
  }

  onPageChange(event: PageEvent) {
    this.taskService
      .getTasks(event.pageIndex + 1, event.pageSize)
      .subscribe((data) => this.taskService.tasks.set(data));
  }
}
