import { Component, inject, computed } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'edit-task-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task-dialog.html',
})
export class EditTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditTaskDialogComponent>);

  readonly data: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  } = inject(MAT_DIALOG_DATA);

  readonly taskService = inject(TaskService);

  formGroup = new FormGroup({
    title: new FormControl(this.data.title, [Validators.required]),
    description: new FormControl(this.data.description),
  });

  onSave() {
    if (this.formGroup.valid) {
      const { title, description } = this.formGroup.value;
      this.taskService.editTask(this.data.id, {
        title: title as string,
        description: description as string | undefined,
        completed: this.data.completed,
      });
      this.dialogRef.close();
    }
  }
}
