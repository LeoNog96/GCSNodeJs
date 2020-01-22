import {Storage} from '@google-cloud/storage'
import path from 'path'
import config from './config'
const serviceKey = path.join(__dirname, './storageKey.json')

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: config.projectId,
})

export default storage

// const Cloud = require('@google-cloud/storage')
// const path = require('path')
// const serviceKey = path.join(__dirname, './keys.json')

// const { Storage } = Cloud
// const storage = new Storage({
//   keyFilename: serviceKey,
//   projectId: 'your project id',
// })