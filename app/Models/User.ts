import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import Hash from "@ioc:Adonis/Core/Hash";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  name: string;

  @column()
  initials: string;

  @column()
  email: string;

  @column()
  password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(model: User) {
    model.id = uuid();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
