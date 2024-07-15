import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  afterCreate,
  BaseModel,
  beforeSave,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import * as relations from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Photo from '#models/photo'
import * as relations_1 from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
  })
  declare roles: relations.ManyToMany<typeof Role>

  @hasMany(() => Photo)
  declare photos: relations_1.HasMany<typeof Photo>

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  @afterCreate()
  static async assignDefaultRole(user: User) {
    const defaultRole = await Role.findByOrFail('name', 'viewer') // Replace 'viewer' with the default role name
    await user.related('roles').attach([defaultRole.id])
  }
  async hasPermission(permissionName: string): Promise<boolean> {
    await this.load('roles', (rolesQuery) => {
      rolesQuery.preload('permissions')
    })

    const userPermissions = this.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name)
    )
    return userPermissions.includes(permissionName)
  }
}
