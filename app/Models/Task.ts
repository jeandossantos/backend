import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import User from "./User";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @hasOne(() => User)
  user: HasOne<typeof User>;

  @column()
  user_id: string;

  @column()
  title: string;

  @column()
  description?: string;

  @column()
  done: boolean;

  @column({
    serialize: (value: number) => {
      return Number(value);
    },
  })
  priority: number;

  @column()
  deadline?: DateTime | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(model: Task) {
    model.id = uuid();
  }
}
