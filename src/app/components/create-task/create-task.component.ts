import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { type Task, TaskStatus } from '../../../types';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<CreateTaskComponent>);
  readonly data = inject<{ task?: Task }>(MAT_DIALOG_DATA);
  readonly taskStatuses = [
    {
      label: "To Do",
      value: TaskStatus.ToDo
    },
    {
      label: "In Progress",
      value: TaskStatus.InProgress
    },
    {
      label: "Done",
      value: TaskStatus.Done
    }
  ];

  readonly taskFormGroup = this.fb.group({
    title: this.fb.control<string>(this.data.task?.title || "", [Validators.required]),
    description: this.fb.control<string>(this.data.task?.description || "", [Validators.required]),
    dueDate: this.fb.control<Date | null>(this.data.task?.dueDate ? new Date(this.data.task.dueDate) : null, [Validators.required]),
    status: this.fb.control<TaskStatus>(this.data.task?.status ?? TaskStatus.ToDo)
  });

  get titleControl() { return this.taskFormGroup.get('title') as FormControl<string | null> }
  get descriptionControl() { return this.taskFormGroup.get('description') as FormControl<string | null> }
  get dueDateControl() { return this.taskFormGroup.get('dueDate') as FormControl<Date | null> }
  get statusControl() { return this.taskFormGroup.get('status') as FormControl<number | null> }

  get TaskStatuses() {
    return
  }

  close(task?: typeof this.taskFormGroup.value) {
    console.log(task)
    this.dialogRef.close(task ? { ...task, dueDate: task.dueDate?.getTime() } : null);
  }
}
