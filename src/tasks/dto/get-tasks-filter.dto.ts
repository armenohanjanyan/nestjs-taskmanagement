import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([Status.OPEN, Status.IN_PROGRESS, Status.IN_PROGRESS])
  status: Status;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
