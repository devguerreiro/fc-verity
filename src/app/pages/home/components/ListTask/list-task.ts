import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Task, TaskService } from '../../../../services/task.service';
import { EditTaskDialogComponent } from '../EditTaskDialog/edit-task-dialog';

@Component({
  selector: 'list-task',
  imports: [MatIconModule, MatCheckboxModule],
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

  completeTask(task: Task) {
    this.taskService.editTask(task.id, {
      ...task,
      completed: true,
    });
  }

  incompleteTask(task: Task) {
    this.taskService.editTask(task.id, {
      ...task,
      completed: false,
    });
  }
}
