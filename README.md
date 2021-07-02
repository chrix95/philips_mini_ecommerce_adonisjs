# Philips min-ecommerce API
This is an API solution for a mini-ecommerce.

### Setup

1. clone the project on https://github.com/chrix95/philips_mini_ecommerce_adonisjs
2. change into the directory `philips_new_ecommerce_adonisjs`
3. on the command line run `npm install` to install all dependencies
4. copy the content of the `.env.example` to a new file `.env`
5. Update the following with your DB credentials
```js
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=adonis
```
6. run the following command to run startup migrations.
```js
adonis migration:run
```
7. on the command line run `adonis key:generate` to set your application key
