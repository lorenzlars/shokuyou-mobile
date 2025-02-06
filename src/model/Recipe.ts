import {Model} from '@nozbe/watermelondb'
import {date, readonly, text} from '@nozbe/watermelondb/decorators'

export default class Recipe extends Model {
  static table = 'recipes'

  @text('name') name: string;
  @text('description') description: string;

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
