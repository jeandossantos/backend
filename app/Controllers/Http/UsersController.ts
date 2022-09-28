import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class UsersController {
  async create({ request }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string(),
      email: schema.string({}, [rules.email()]),
      initials: schema.string(),
      password: schema.string({}, [
        rules.minLength(5),
        rules.confirmed("confirmPassword"),
      ]),
    });

    const payload = await request.validate({ schema: newUserSchema });

    const { name, initials, email, password } = payload;
    const user = await User.create({
      name,
      email,
      initials,
      password,
    });

    return user;
  }
}
