import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ControlsComponent } from "./components/controls/controls.component";
import { TaskTableComponent } from "./components/task-table/task-table.component";
import { type ExtendedTask, TaskStore } from '../store/task.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    ControlsComponent,
    TaskTableComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TaskStore]
})
export class AppComponent {
  private readonly dialog = inject(MatDialog);
  readonly store = inject(TaskStore);
  dataSource = new MatTableDataSource(this.store.taskList());

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.taskList();
    })
  }

  openDialog(task?: ExtendedTask) {
    this.dialog.open(CreateTaskComponent, {
      data: { task }
    }).afterClosed().subscribe({
      next: (v) => {
        if (v && task) this.store.editTask(task.idx, v);
        else if (v) this.store.addTask(v);
      }
    });
  }

  deleteTask(task: ExtendedTask) {
    this.store.deleteTask(task.idx);
  }
}
