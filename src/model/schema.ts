import { appSchema, tableSchema } from '@nozbe/watermelondb';
import Recipe from './Recipe';
import Ingredient from './Ingredient';
import RecipesIngredients from './RecipesIngredients';
import Product from './Product';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: Recipe.table,
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'imageUrl', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: Ingredient.table,
      columns: [
        { name: 'name', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: RecipesIngredients.table,
      columns: [
        { name: 'unit', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'recipe_id', type: 'string', isIndexed: true },
        { name: 'ingredient_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: Product.table,
      columns: [
        { name: 'done', type: 'boolean', isOptional: true },
        { name: 'name', type: 'string' },
        { name: 'unit', type: 'string', isOptional: true },
        { name: 'quantity', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
