'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategoriesSchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments()
      table.string('name', 250).notNullable()
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategoriesSchema
