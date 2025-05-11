import { Component } from '@angular/core';

import { AddTaskFormComponent } from './components/AddTaskForm/add-task-form';
import { ListTaskComponent } from './components/ListTask/list-task';

@Component({
  selector: 'home-page',
  imports: [AddTaskFormComponent, ListTaskComponent],
  templateUrl: './page.html',
})
export class HomePageComponent {}
