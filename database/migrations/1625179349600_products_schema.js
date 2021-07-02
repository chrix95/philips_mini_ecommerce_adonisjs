'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('Users.id')
      table.integer('product_category_id').references('ProductCategories.id')
      // table.foreign('product_category_id')
      table.integer('product_sub_category_id').references('ProductSubCategories.id')
      // table.foreign('product_sub_category_id')
      table.string('title', 250)
      table.string('description', 255)
      table.integer('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
