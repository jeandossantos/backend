import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().index();

      table.uuid("user_id").index();

      table.string("title").notNullable();

      table.string("description");

      table
        .enum("priority", [0, 1, 2], {
          useNative: true,
          enumName: "user_task_priority",
          existingType: false,
        })
        .defaultTo(0);

      table.boolean("done").defaultTo(false);

      table.timestamp("deadline", { useTz: true });
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });

      table.foreign("user_id").references("users.id").onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.alterTable("tasks", (table) => {
      table.dropForeign("user_id");
    });

    this.schema.dropTable(this.tableName);
    this.schema.raw('DROP TYPE IF EXISTS "user_task_priority"');
  }
}
