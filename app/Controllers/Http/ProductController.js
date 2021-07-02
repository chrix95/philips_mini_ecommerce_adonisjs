'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const { validate } = use("Validator");
const Product = use("App/Models/Product");

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async getProducts({ response, auth }) {
    const products = await auth.user.products().fetch();
    return response.json({
      status: true,
      message: "success",
      data: products,
    });
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    // set validation rules and validate
    const rules = {
      product_category_id: "required|integer",
      product_sub_category_id: "required|integer",
      title: "required|min:3|max:255|unique:products,title",
      description: "required|min:3|max:255",
      price: "required|integer",
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message,
      });
    }
    const new_product = await auth.user.products().create(request.all());

    return response.json({
      status: true,
      message: "success",
      data: new_product
    });
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const product = await Product.find(params.id);
    if (!product) {
      return response.json({
        status: false,
        message: "Product not found",
      });
    }
    return response.json({
      status: true,
      message: "success",
      data: product
    });
  }

 /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // set validation rules and validate
    const rules = {
      product_category_id: "required|integer",
      product_sub_category_id: "required|integer",
      title: "required|min:3|max:255",
      description: "required|min:3|max:255",
      price: "required|integer",
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message,
      });
    }
    const product = await Product.find(params.id);
    if (!product) {
      return response.json({
        status: false,
        message: "Product not found",
      });
    }
    product.product_category_id = request.input("product_category_id");
    product.product_sub_category_id = request.input("product_sub_category_id");
    product.title = request.input("title");
    product.description = request.input("description");
    product.price = request.input("price");
    await product.save();
    return response.json({
      status: true,
      message: "success",
      data: product,
    });
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const product = await Product.find(params.id);
    if (!product) {
      return response.json({
        status: false,
        message: "Product not found",
      });
    }
    await product.delete();
    return response.json({
      status: true,
      message: "Product has been deleted",
    });
  }
}

module.exports = ProductController
