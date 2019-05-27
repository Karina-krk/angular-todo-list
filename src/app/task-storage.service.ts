import {Injectable} from '@angular/core';

import {init_tasks} from '../assets/todo-list.json';
import {Task} from "../app/shared/models/task.model";
import {Router} from "@angular/router"


@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  tasks: Task[] = [];

  initialized = false;

  constructor() {
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Remove the tasks from the list
   *
   * @param index task index to remove
   */
  delete(id) {

    let remaining_tasks: Task[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      var current_task = this.tasks[i];

      // we found the task to remove, we do not include it in our new array
      if (id == current_task.id) {
        console.log('Skipping tash[' + current_task.title + ']');
        continue;
      }

      remaining_tasks.push(this.tasks[i]);
    }
    this.tasks = remaining_tasks;
    return true;
  }

  get(id): Task {

    this.init();

    for (let i = 0; i < this.tasks.length; i++) {
      var task = this.tasks[i];
      // we found the task to remove, we do not include it in our new array
      if (task.id != id) {
        continue;
      }
      return task;
    }
    console.log('not found');

    return null;
  }

  //
  // add(title, note) {
  //
  //
  // }
  //
  /**
   * Update the task and return it
   *
   * @param id
   * @param title
   * @param note
   *
   * @return Task
   */
  update(id, title: string, note: string): Task {

    var task = this.get(id);

    task.title = title;
    task.note = note;

    return task;
  }

  /**
   * Load tasks from json files
   */
  init() {

    if (this.initialized) {
      console.log('Already initialized');
      return;
    }
    console.log('Loading data from json file');


    for (let i = 0; i < init_tasks.length; i++) {
      var task = new Task();

      task.id = init_tasks[i]['id'];
      task.title = init_tasks[i]['title'];
      task.note = init_tasks[i]['note'];

      this.tasks.push(task);

    }

    this.initialized = true;
  }
}