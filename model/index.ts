import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {schema} from "./schema";
import migrations from "./migrations";
import Recipe from "./Recipe";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
})

export const database = new Database({
  adapter,
  modelClasses: [Recipe],
})
