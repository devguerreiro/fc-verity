import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'add-task-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-task-form.html',
})
export class AddTaskFormComponent {
  taskService = inject(TaskService);

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onAdd() {
    if (this.formGroup.valid) {
      const { title, description } = this.formGroup.value;
      this.taskService.addTask(title as string, description as string);
      this.formGroup.reset();
    }
  }
}
