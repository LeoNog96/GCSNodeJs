import express from 'express'
import bodyParser from 'body-parser'
import multer  from 'multer'
import uploadFile from './src/helpers/helpers'

const app = express()
const PORT = 9001
const END = 'loca'
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: 5 * 1024 * 1024 * 1024,
    },
})
  
app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
  
app.post('/uploads', async (req, res, next) => {
    try {
      const imageUrl = uploadFile(req, res, next)
      res.status(200).json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
        console.log(error)
      next(error)
    }
})
  
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      error: err,
      message: 'Internal server error!',
    })
    next()
})
  
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`)
})