"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with productcategories
 */
const { validate } = use("Validator");
const ProductCategory = use("App/Models/ProductCategory");
class ProductCategoryController {
  /**
   * Show a list of all productcategories.
   * GET productcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getProductCategory({ response }) {
    const product_category = await ProductCategory.query()
      .with("product_sub_category")
      .fetch();
    return response.json({
      status: true,
      message: "success",
      data: product_category,
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
      name: "required|min:3|max:255",
      status: "required|boolean",
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message,
      });
    }
    const product_category = await ProductCategory.create(request.all());

    return response.json({
      status: true,
      message: "success",
      data: product_category,
    });
  }

  /**
   * Display a single productcategory.
   * GET productcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const product_category = await ProductCategory.find(params.id);
    if (!product_category) {
      return response.json({
        status: false,
        message: "Not found",
      });
    }
    return response.json({
      status: true,
      message: "success",
      data: product_category,
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
      name: "required|min:3|max:255",
      status: "required|boolean",
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message,
      });
    }
    const product_category = await ProductCategory.find(params.id);
    if (!product_category) {
      return response.json({
        status: false,
        message: "Not found",
      });
    }
    product_category.name = request.input("name");
    product_category.status = request.input("status");
    await product_category.save();
    return response.json({
      status: true,
      message: "success",
      data: product_category,
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
    const product_category = await ProductCategory.find(params.id);
    if (!product_category) {
      return response.json({
        status: false,
        message: "Not found",
      });
    }
    await product_category.delete();
    return response.json({
      status: true,
      message: "Product category has been deleted",
    });
  }
}

module.exports = ProductCategoryController;
