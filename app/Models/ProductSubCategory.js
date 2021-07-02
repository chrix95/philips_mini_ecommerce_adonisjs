'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductSubCategory extends Model {
    product_category() {
        return this.belongsTo('App/Models/ProductCategory');
    }
}

module.exports = ProductSubCategory
