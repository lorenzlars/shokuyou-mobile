import { Model } from '@nozbe/watermelondb';
import { date, readonly, text, field } from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
  static table = 'products';

  @field('done') done: boolean;
  @text('name') name: string;
  @text('unit') unit?: string;
  @field('quantity') quantity?: number;

  @readonly @date('created_at') createdAt: Date;
  @readonly @date('updated_at') updatedAt: Date;
}
