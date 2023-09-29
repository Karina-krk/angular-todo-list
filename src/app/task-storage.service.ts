import { Injectable } from "@angular/core";
import { init_tasks } from "../assets/todo-list.json";
import { Task } from "../app/shared/models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskStorageService {
  tasks: Task[] = [];

  initialized: boolean = false;

  constructor() {}

  getTasks(): Task[] {
    this.init();
    return this.tasks;
  }

  delete(id: number) {
    let remaining_tasks: Task[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      var current_task = this.tasks[i];

      // we found the task to remove, we do not include it in our new array
      if (id == current_task.id) {
        console.log("Skipping tash[" + current_task.title + "]");
        continue;
      }

      remaining_tasks.push(this.tasks[i]);
    }
    this.tasks = remaining_tasks;
    return true;
  }

  get(id: number): Task {
    this.init();

    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      // we found the task to remove, we do not include it in our new array
      if (task.id != id) {
        continue;
      }
      return task;
    }

    return null;
  }

  add(data: Task) {
    const task = new Task(
      data.title,
      data.note,
      this.getHighestId() + 1,
      data.status,
      data.difficulty
    );
    this.tasks.push(task);
  }

  update(data: Task): Task {
    const task = this.get(data.id);
    task.title = data.title;
    task.note = data.note;
    task.status = data.status;
    task.difficulty = data.difficulty;

    return task;
  }

  /**
   * Load tasks from json file
   */
  init() {
    if (this.initialized) {
      console.log("Already initialized");
      return;
    }
    console.log("Loading data from json file");

    for (let i = 0; i < init_tasks.length; i++) {
      this.tasks.push(
        new Task(
          init_tasks[i]["title"],
          init_tasks[i]["note"],
          init_tasks[i]["id"],
          init_tasks[i]["status"],
          init_tasks[i]["difficulty"]
        )
      );
    }

    this.initialized = true;
  }

  /**
   * Returns highest task id from our list.
   */
  getHighestId(): number {
    let highest: number = 0;
    this.init();
    this.tasks.forEach(function (current_task: Task) {
      if (current_task.id < highest) {
        return;
      }

      highest = current_task.id;
    });

    return highest;
  }
}