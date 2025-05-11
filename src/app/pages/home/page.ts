import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AddTaskFormComponent } from './components/AddTaskForm/add-task-form';
import { ListTaskComponent } from './components/ListTask/list-task';

@Component({
  selector: 'home-page',
  imports: [MatIconModule, AddTaskFormComponent, ListTaskComponent],
  templateUrl: './page.html',
})
export class HomePageComponent {}
