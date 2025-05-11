import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { TaskService } from '../../../../services/task.service';
import { EditTaskDialogComponent } from '../EditTaskDialog/edit-task-dialog';

@Component({
  selector: 'list-task',
  imports: [MatIconModule],
  templateUrl: './list-task.html',
})
export class ListTaskComponent {
  taskService = inject(TaskService);

  readonly dialog = inject(MatDialog);

  openEditTaskDialog(id: number, title: string, description?: string): void {
    this.dialog.open(EditTaskDialogComponent, {
      width: '250px',
      data: {
        id,
        title,
        description,
      },
    });
  }
}
