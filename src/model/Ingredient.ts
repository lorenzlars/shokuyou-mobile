import { Model, Q } from '@nozbe/watermelondb';
import { date, lazy, readonly, text } from '@nozbe/watermelondb/decorators';
import Recipe from './Recipe';
import RecipesIngredients from './RecipesIngredients';

export default class Ingredient extends Model {
  static table = 'ingredients';
  static associations = {
    recipes_ingredients: { type: 'has_many', foreignKey: 'ingredient_id' },
  };

  @text('name') name: string;

  @readonly @date('created_at') createdAt: Date;
  @readonly @date('updated_at') updatedAt: Date;

  @lazy
  recipes = this.collections
    .get<Recipe>('recipes')
    .query(Q.on(RecipesIngredients.table, 'ingredient_id', this.id));
}
