'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductCategory extends Model {
    product_sub_category() {
        return this.hasMany('App/Models/ProductSubCategory')
    }
}

module.exports = ProductCategory
