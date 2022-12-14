import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Task from "App/Models/Task";

export default class TasksController {
  async create({ request }: HttpContextContract) {
    const newTaskSchema = schema.create({
      user_id: schema.string({}, [
        rules.exists({ table: "users", column: "id" }),
      ]),
      title: schema.string(),
      description: schema.string.optional(),
      priority: schema.number([rules.range(0, 2)]),
      done: schema.boolean(),
      deadline: schema.date.nullable(),
    });

    const { user_id, title, description, priority, done, deadline } =
      await request.validate({ schema: newTaskSchema });

    const task = await Task.create({
      user_id,
      title,
      description,
      priority,
      done,
      deadline,
    });

    return task;
  }

  async index({ request }: HttpContextContract) {
    const { page, search = "" } = request.qs();
    const limit = 4;

    console.log(search);

    const user_id = request.param("id");

    const tasks = await Task.query()
      .where("user_id", user_id)
      .whereILike("title", `%${search}%`)
      .orderBy("createdAt", "desc")
      .paginate(page || 1, limit);

    return tasks;
  }

  async update({ request }: HttpContextContract) {
    const newTaskSchema = schema.create({
      title: schema.string(),
      description: schema.string.optional(),
      priority: schema.number([rules.range(0, 2)]),
      done: schema.boolean(),
      deadline: schema.date.nullable(),
    });

    const { title, description, priority, done, deadline } =
      await request.validate({ schema: newTaskSchema });

    const taskId = request.param("id");

    const task = await Task.findOrFail(taskId);
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.done = done;
    task.deadline = deadline;

    await task.save();

    return task;
  }

  async destroy({ request }: HttpContextContract) {
    const taskId = request.param("id");

    const task = await Task.findOrFail(taskId);

    await task.delete();
  }

  async show({ request }: HttpContextContract) {
    const taskId = request.param("id");

    const task = await Task.find(taskId);

    return task;
  }

  async markAsDoneOrPending({ request, auth, response }: HttpContextContract) {
    const taskId = request.param("id");

    const userId = auth.user?.id;

    const task = await Task.query()
      .where("id", taskId)
      .where("user_id", userId!)
      .first();

    if (!task) {
      return response.badRequest(
        "Task does not exist or does not belong to this user"
      );
    }

    task!.done = !task.done;

    await task.save();
  }
}
