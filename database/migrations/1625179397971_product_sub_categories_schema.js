'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSubCategoriesSchema extends Schema {
  up () {
    this.create('product_sub_categories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('product_category_id')
      table.foreign('product_category_id').references('ProductCategories.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_sub_categories')
  }
}

module.exports = ProductSubCategoriesSchema
