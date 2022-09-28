import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

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

  /*   @column()
  name: string;

  @column()
  description: string;

  @column()
  done: boolean;

  @column()
  deadline: Date | null;
 */
}
