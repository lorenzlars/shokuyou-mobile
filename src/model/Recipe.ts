import { Model, Q } from '@nozbe/watermelondb';
import { date, lazy, readonly, text, writer } from '@nozbe/watermelondb/decorators';
import Ingredient from './Ingredient';
import RecipesIngredients from './RecipesIngredients';

type AddIngredientDto = {
  name: string;
  unit: string;
  quantity: number;
};

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

  @writer async addIngredient({ name, unit, quantity }: AddIngredientDto) {
    let [ingredient] = await this.collections
      .get<Ingredient>('ingredients')
      .query(Q.where('name', Q.like(name)))
      .fetch();

    if (!ingredient) {
      ingredient = await this.collections
        .get<Ingredient>(Ingredient.table)
        .create((newIngredient) => {
          newIngredient.name = name;
        });
    }

    await this.collections
      .get<RecipesIngredients>(RecipesIngredients.table)
      .create((recipesIngredients) => {
        recipesIngredients.ingredient.set(ingredient);
        recipesIngredients.recipe.set(this);
        recipesIngredients.quantity = quantity;
        recipesIngredients.unit = unit;
      });
  }
}
