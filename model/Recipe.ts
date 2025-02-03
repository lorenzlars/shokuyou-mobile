import {Model} from '@nozbe/watermelondb'
import {text} from '@nozbe/watermelondb/decorators'


export default class Recipe extends Model {
  static table = 'recipes'

  @text('name') name: string;
  @text('description') description: string;
}
