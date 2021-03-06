import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto) {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = Status.OPEN;
    await task.save();

    return task;
  }
}
