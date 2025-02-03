import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {schema} from "./schema";
import migrations from "./migrations";
import Recipe from "./Recipe";

export let database: Database;

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
})

export function initDatabase() {
  if (!database) {
    database = new Database({
      adapter,
      modelClasses: [Recipe],
    })
  }
}
