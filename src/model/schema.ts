import {appSchema, tableSchema} from '@nozbe/watermelondb'

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'recipes',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ]
    }),
  ]
})
