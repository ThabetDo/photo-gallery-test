// eslint-disable-next-line unicorn/filename-case
import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Permission from '#models/permission'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
  })
  declare permissions: relations.ManyToMany<typeof Permission>
}
