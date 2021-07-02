"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with productcategories
 */
const ProductCategory = use("App/Models/ProductCategory");
const ProductSubCategory = use("App/Models/ProductSubCategory");
const { validate } = use("Validator");

class ProductSubCategoryController {
  /**
   * Show a list of all productcategories.
   * GET productcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getProductSubCategory({ response }) {
    let product_sub_category = await ProductSubCategory.all();
    return response.json({
      status: true,
      message: "success",
      data: product_sub_category,
    });
  }

  /**
   * Create/save a new productcategory.
   * POST productcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    // set validation rules and validate
    const rules = {
      name: "required|min:3|max:255|unique:product_sub_categories,name",
      product_category_id: "required|integer"
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message,
      });
    }

    let product_category = await ProductCategory.find(request.input("product_category_id"))

    if (!product_category) {
      return response.json({
        status: false,
        message: "Invalid product category"
      });
    }
    let product_sub_category = await product_category.product_sub_category().create(request.only(['name']));

    return response.json({
      status: true,
      message: "success",
      data: product_sub_category,
    });
  }

  /**
   * Update productcategory details.
   * PUT or PATCH productcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    // set validation rules and validate
    const rules = {
      name: "required|min:3|max:255"
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message,
      });
    }

    let product_sub_category = await ProductSubCategory.find(params.id)

    if (!product_sub_category) {
      return response.json({
        status: false,
        message: "Invalid product subcategory"
      });
    }
    product_sub_category.name = request.input('name');

    product_sub_category.save();

    return response.json({
      status: true,
      message: "success",
      data: product_sub_category,
    });
  }

  /**
   * Delete a productcategory with id.
   * DELETE productcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    let product_sub_category = await ProductSubCategory.find(params.id);
    if (!product_sub_category) {
      return response.json({
        status: false,
        message: "Not found",
      });
    }
    await product_sub_category.delete();
    return response.json({
      status: true,
      message: "Product subcategory has been deleted",
    });
  }
}

module.exports = ProductSubCategoryController;
