import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
  async login({ request, response, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    const user = await User.query().where("email", email).firstOrFail();

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized("Invalid e-mail/password");
    }

    const token = await auth.use("api").attempt(email, password);

    return { user, token };
  }

  async logout({ auth }: HttpContextContract) {
    await auth.use("api").revoke();

    return {
      revoked: true,
    };
  }
}
