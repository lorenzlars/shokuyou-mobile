import {Model} from '@nozbe/watermelondb'
import {date, readonly, text} from '@nozbe/watermelondb/decorators'

export default class Ingredient extends Model {
  static table = 'ingredients'

  @text('name') name: string;

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
