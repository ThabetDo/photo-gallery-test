import { DriveProvider } from '@adonisjs/core/drive'

const driveConfig: DriveProvider = {
  disk: 'local',

  disks: {
    local: {
      driver: 'local',
      visibility: 'public',
      root: 'uploads',
      serveFiles: true,
      basePath: '/uploads',
    },
  },
}

export default driveConfig
