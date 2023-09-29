import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Task } from "../shared/models/task.model";
import { TaskStorageService } from "../task-storage.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.css"],
})
export class TaskEditComponent implements OnInit {
  task: Task;
  id: number;
  title = new FormControl("");
  note = new FormControl("");
  status = new FormControl("");
  difficulty = new FormControl("");

  constructor(
    private storage: TaskStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.task = this.storage.get(params.get("id") as unknown as number);
      this.id = this.task.id;
      this.note.setValue(this.task.note);
      this.title.setValue(this.task.title);
      this.status.setValue(this.task.status);
      this.difficulty.setValue(this.task.difficulty);
    });
  }

  updateTask() {
    this.task = this.storage.update({
      id: this.id,
      difficulty: this.difficulty.value,
      status: this.status.value,
      note: this.note.value,
      title: this.title.value,
    });
    this.router.navigate(["/tasks"]);
  }
}