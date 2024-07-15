import type { HttpContext } from '@adonisjs/core/http'
import Photo from '#models/photo'
import app from '@adonisjs/core/services/app'

export default class PhotosController {
  async index({ auth }: HttpContext) {
    const user = auth.user!

    if (await user.hasPermission('view-photos')) {
      const photos = await Photo.all()
      return photos
    } else {
      const photos = await user.related('photos').query()
      return photos
    }
  }

  async store({ request, auth }: HttpContext) {
    const user = auth.user!

    const photo = new Photo()
    photo.title = request.input('title')
    photo.userId = user.id
    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (image) {
      const fileName = `${new Date().getTime()}.${image.extname}`
      await image.move(app.makePath('tmp/uploads'), { name: fileName })

      photo.image_url = `${request.protocol()}://${request.host()}/uploads/${fileName}`
    }

    await photo.save()
    return photo
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const photo = await Photo.findOrFail(params.id)

    if (photo.userId === user.id || (await user.hasPermission('view-photos'))) {
      return photo
    } else {
      return response.unauthorized({ message: 'You do not have permission to view this photo' })
    }
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const photo = await Photo.findOrFail(params.id)

    if (photo.userId === user.id) {
      photo.title = request.input('title')
      await photo.save()
      return photo
    } else {
      return response.unauthorized({ message: 'You do not have permission to update this photo' })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const photo = await Photo.findOrFail(params.id)

    if (photo.userId === user.id) {
      await photo.delete()
      return response.noContent()
    } else {
      return response.unauthorized({ message: 'You do not have permission to delete this photo' })
    }
  }
}
