import util from 'util'
import storage from '../config'

const bucketName = 'storage-gedis-dev'// should be your bucket name

const bucket = storage.bucket(bucketName).combine()

function getPublicUrl (filename) {
	return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

const uploadFile =(req, res, next) => {
	
	if (!req.file) {
		return next()
	}

	let filename = req.file.originalname

	const gcsname = Date.now() + req.file.originalname
	
	const file = bucket.file(gcsname)

	const stream = file.createWriteStream({

		metadata: {
			contentType: req.file.mimetype
		},
		resumable: false
	})

	stream.on('error', (err) => {
		req.file.cloudStorageError = err
		next(err)
	})

	stream.on('finish', () => {
		req.file.cloudStorageObject = gcsname
	})

	stream.end(req.file.buffer)
	
	console.log(`${filename} uploaded to ${bucketName}.`)

	return getPublicUrl(filename)
}

export default uploadFile