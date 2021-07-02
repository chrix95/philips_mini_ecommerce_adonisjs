'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    user() {
        return this.belongsTo('App/Models/User');
    }
    product_category() {
        return this.hasOne('App/Models/ProductCategory');
    }
    product_sub_category() {
        return this.hasOne('App/Models/ProductSubCategory');
    }
}

module.exports = Product
