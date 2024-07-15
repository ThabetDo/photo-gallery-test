import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Role from '#models/Role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'role_permissions',
  })
  declare roles: relations.ManyToMany<typeof Role>
}
