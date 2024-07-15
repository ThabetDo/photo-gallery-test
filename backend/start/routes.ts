/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import app from '@adonisjs/core/services/app'

const PhotosController = () => import('#controllers/photos_controller')

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')

router.get('/api/photos', [PhotosController, 'index']).as('photos.index').use(middleware.auth())
router.post('/api/photos', [PhotosController, 'store']).as('photos.store').use(middleware.auth())
router.get('/api/photos/:id', [PhotosController, 'show']).as('photos.show').use(middleware.auth())
router
  .put('/api/photos/:id', [PhotosController, 'update'])
  .as('photos.update')
  .use(middleware.auth())
router
  .delete('/api/photos/:id', [PhotosController, 'destroy'])
  .as('photos.destroy')
  .use(middleware.auth())
router.get('/uploads/:fileName', async ({ params, response }) => {
  const filePath = app.tmpPath('uploads', params.fileName)
  console.log({ filePath })
  return response.download(filePath)
})
