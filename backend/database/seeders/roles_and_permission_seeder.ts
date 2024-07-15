import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/Role'
import Permission from '#models/permission'
import User from '#models/user'

export default class RolesAndPermissionsSeeder extends BaseSeeder {
  async run() {
    // Define permissions
    const permissions = ['read-photo', 'edit-photo', 'show-photo']

    // Insert permissions
    for (const permissionName of permissions) {
      await Permission.updateOrCreate({ name: permissionName }, { name: permissionName })
    }

    // Define roles and their permissions
    const roles = [
      {
        name: 'admin',
        permissions: permissions,
      },
      {
        name: 'editor',
        permissions: ['read-photo', 'edit-photo'],
      },
      {
        name: 'viewer',
        permissions: ['read-photo', 'show-photo'],
      },
    ]

    // Insert roles and attach permissions
    for (const roleData of roles) {
      const role = await Role.updateOrCreate({ name: roleData.name }, { name: roleData.name })
      const rolePermissions = await Permission.query().whereIn('name', roleData.permissions)
      await role.related('permissions').sync(rolePermissions.map((permission) => permission.id))
    }

    // Assign roles to users
    const adminRole = await Role.findByOrFail('name', 'admin')
    const editorRole = await Role.findByOrFail('name', 'editor')
    const viewerRole = await Role.findByOrFail('name', 'viewer')

    const adminUser = await User.findByOrFail('email', 'admin@gmail.com')
    const editorUser = await User.findByOrFail('email', 'editor@gmail.com')
    const viewerUser = await User.findByOrFail('email', 'viewer@gmail.com')

    await adminUser.related('roles').attach([adminRole.id])
    await editorUser.related('roles').attach([editorRole.id])
    await viewerUser.related('roles').attach([viewerRole.id])
  }
}
