import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus, taskStatusPretty } from '../../../types';

@Pipe({
  name: 'toTaskStatus',
  standalone: true
})
export class ToTaskStatusPipe implements PipeTransform {

  transform(value: keyof typeof TaskStatus): unknown {
    return taskStatusPretty[TaskStatus[value] as unknown as keyof typeof taskStatusPretty];
  }
}
