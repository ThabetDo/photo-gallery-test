import path, { join } from 'node:path'
import { AssetsConfig } from '@adonisjs/static/types'
import * as url from 'node:url'

const staticConfig: AssetsConfig = {
  enabled: true,
  // @ts-ignore
  paths: {
    '/': join(path.dirname(url.fileURLToPath(import.meta.url)), '..', 'public'),
    '/uploads': join(path.dirname(url.fileURLToPath(import.meta.url)), '..', 'uploads'), // Add this line to serve uploads directory
  },
  options: {
    maxAge: 0,
    etag: true,
  },
}

export default staticConfig
