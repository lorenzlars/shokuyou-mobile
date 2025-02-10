import { Model } from '@nozbe/watermelondb';
import { date, readonly, text } from '@nozbe/watermelondb/decorators';

export default class Recipe extends Model {
  static table = 'recipes';

  @text('name') name: string;
  @text('description') description: string;
  @text('imageUrl') imageUrl: string;

  // @relation('ingredients', 'ingredient_id') ingredients

  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
