import { BaseSchema } from '@adonisjs/lucid/schema'
export default class RolesAndPermissions extends BaseSchema {
  protected rolesTableName = 'roles'
  protected permissionsTableName = 'permissions'
  protected rolePermissionsTableName = 'role_permissions'
  protected userRolesTableName = 'user_roles'

  async up() {
    this.schema.createTable(this.rolesTableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.datetime('created_at', { useTz: true }).notNullable()
      table.datetime('updated_at', { useTz: true }).notNullable()
    })

    this.schema.createTable(this.permissionsTableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.datetime('created_at', { useTz: true }).notNullable()
      table.datetime('updated_at', { useTz: true }).notNullable()
    })

    this.schema.createTable(this.rolePermissionsTableName, (table) => {
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(this.rolesTableName)
        .onDelete('CASCADE')
      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable(this.permissionsTableName)
        .onDelete('CASCADE')
      table.datetime('created_at', { useTz: true }).notNullable()
      table.datetime('updated_at', { useTz: true }).notNullable()
      table.primary(['role_id', 'permission_id'])
    })

    this.schema.createTable(this.userRolesTableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(this.rolesTableName)
        .onDelete('CASCADE')
      table.datetime('created_at', { useTz: true }).notNullable()
      table.datetime('updated_at', { useTz: true }).notNullable()
      table.primary(['user_id', 'role_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.userRolesTableName)
    this.schema.dropTable(this.rolePermissionsTableName)
    this.schema.dropTable(this.permissionsTableName)
    this.schema.dropTable(this.rolesTableName)
  }
}
