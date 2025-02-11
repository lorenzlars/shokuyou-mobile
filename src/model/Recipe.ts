import { Model, Q } from '@nozbe/watermelondb';
import { date, lazy, readonly, text } from '@nozbe/watermelondb/decorators';
import Ingredient from './Ingredient';
import RecipesIngredients from './RecipesIngredients';

export default class Recipe extends Model {
  static table = 'recipes';
  static associations = {
    recipes_ingredients: { type: 'has_many', foreignKey: 'recipe_id' },
  };

  @text('name') name: string;
  @text('description') description?: string;
  @text('imageUrl') imageUrl?: string;

  @readonly @date('created_at') createdAt: Date;
  @readonly @date('updated_at') updatedAt: Date;

  @lazy
  ingredients = this.collections
    .get<Ingredient>('ingredients')
    .query(Q.on(RecipesIngredients.table, 'recipe_id', this.id));
}
