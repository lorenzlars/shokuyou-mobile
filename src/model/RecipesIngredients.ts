import { Model, Relation } from '@nozbe/watermelondb';
import { date, field, immutableRelation, readonly, text } from '@nozbe/watermelondb/decorators';
import Recipe from './Recipe';
import Ingredient from './Ingredient';

export default class RecipesIngredients extends Model {
  static table = 'recipes_ingredients';
  static associations = {
    recipes: { type: 'belongs_to', key: 'recipe_id' },
    ingredients: { type: 'belongs_to', key: 'ingredient_id' },
  };

  @text('name') unit: string;
  @field('quantity') quantity: number;

  @readonly @date('created_at') createdAt: Date;
  @readonly @date('updated_at') updatedAt: Date;

  @immutableRelation('recipes', 'recipe_id') recipe: Relation<Recipe>;
  @immutableRelation('ingredients', 'ingredient_id') ingredient: Relation<Ingredient>;
}
