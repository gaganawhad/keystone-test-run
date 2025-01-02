// keystone.ts
import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship } from '@keystone-6/core/fields';

const lists = {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
        articles: relationship({ ref: 'Article.author', many: true }),
      },
    }),
    Article: list({
      access: allowAll,
      fields: {
        title: text(),
        author: relationship({
          ref: 'User.articles',
          ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
          },
        },
      },
    }),
  }

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  },
  lists,
});
