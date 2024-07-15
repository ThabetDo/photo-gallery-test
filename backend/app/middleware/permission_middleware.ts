import type { HttpContext } from '@adonisjs/core/http'

export default class PermissionMiddleware {
  async handle({ auth, response }: HttpContext, next: () => Promise<void>, permissions: string[]) {
    const user = await auth.authenticate()
    const hasPermission = await user.hasPermission(permissions[0]) // Assumes single permission for simplicity

    if (!hasPermission) {
      return response.unauthorized({ message: 'You do not have permission to perform this action' })
    }

    await next()
  }
}
