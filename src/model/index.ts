import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {schema} from "./schema";
import migrations from "./migrations";
import Recipe from "./Recipe";
import Ingredient from "./Ingredient";
import Product from "./Product";

export function createDatabase() {
  const adapter = new SQLiteAdapter({
    schema,
    migrations,
    jsi: true,
  })

  return new Database({
    adapter,
    modelClasses: [Recipe, Product, Ingredient],
  })
}
