import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Status } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    Status.OPEN,
    Status.IN_PROGRESS,
    Status.DONE
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      return new BadRequestException(`${value} is an invalid status`)
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index: number = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
