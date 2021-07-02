'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get("/", async () => {
    return { status: true, message: "OK" };
});

Route.group(() => {
    Route.get("/", async () => {
        return { status: true, message: "Welcome to Philips API v1" } 
    })
    Route.post("/auth/register", "AuthController.register")
    Route.post("/auth/login", "AuthController.login")
    // routes for product
    Route.post('/product', 'ProductController.store').middleware('auth')
    Route.get('/product', 'ProductController.getProducts').middleware('auth')
    Route.get('/product/:id', 'ProductController.show').middleware('auth')
    Route.put('/product/:id', 'ProductController.update').middleware('auth')
    Route.delete('product/:id', 'ProductController.destroy').middleware('auth')
    // routes for product categories
    Route.post('/product/category', 'ProductCategoryController.store').middleware('auth')
    Route.get('/product/category', 'ProductCategoryController.getProductCategory').middleware('auth')
    Route.get('/product/category/:id', 'ProductCategoryController.show').middleware('auth')
    Route.put('/product/category/:id', 'ProductCategoryController.update').middleware('auth')
    Route.delete('product/category/:id', 'ProductCategoryController.destroy').middleware('auth')
    // routes for product sub-categories
    Route.post('/product/subcategory', 'ProductSubCategoryController.store').middleware('auth')
    Route.get('/product/subcategory', 'ProductSubCategoryController.getProductSubCategory').middleware('auth')
    Route.put('/product/subcategory/:id', 'ProductSubCategoryController.update').middleware('auth')
    Route.delete('product/subcategory/:id', 'ProductSubCategoryController.destroy').middleware('auth')
}).prefix("/api/v1")

// Route.get('/test/:id', ({ params }) => `This is the post id of ${params.id}`)
