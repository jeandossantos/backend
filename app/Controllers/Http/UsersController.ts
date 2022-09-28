import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  async create({ request }: HttpContextContract) {
    const { name, initials, email, password, confirmPassword } = request.body();

    const user = await User.create({
      name,
      email,
      initials,
      password,
    });

    return user;
  }
}
