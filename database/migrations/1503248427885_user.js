'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 255).unique().notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token', 255).nullable()
      table.enu('type', ['ADMIN', 'SUBADMIN', 'USER'])
      table.string('firstname', 255).notNullable()
      table.string('lastname', 255).notNullable()
      table.string('gender', 255).notNullable()
      table.string('contact_number', 255).notNullable()
      table.string('address', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
