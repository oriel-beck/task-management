import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, input, output, viewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { type MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ToTaskStatusPipe } from "../../pipes/to-task-status/to-task-status.pipe";
import { sortExtendedTasks } from '../../../utils';
import type { ExtendedTask } from '../../../store/task.store';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    ToTaskStatusPipe
],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "mat-elevation-z8 "
  }
})
export class TaskTableComponent implements AfterViewInit {
  readonly columns = ["status", "title", "description", "dueDate", "actions"];

  dataSource = input.required<MatTableDataSource<ExtendedTask, MatPaginator>>();

  deleteTask = output<ExtendedTask>();
  editTask = output<ExtendedTask>();

  sort = viewChild.required(MatSort);
  paginator = viewChild.required(MatPaginator);

  ngAfterViewInit(): void {
    this.dataSource().filterPredicate = (data, filter) => data.title.toLowerCase().startsWith(filter.toLowerCase());
    this.dataSource().sortData = (data, sort) => sortExtendedTasks(data, sort);
    this.dataSource().sort = this.sort();
    this.dataSource().paginator = this.paginator();
  }
}
