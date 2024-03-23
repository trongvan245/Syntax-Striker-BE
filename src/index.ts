import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/databse.services'
import { defaultErrorHandler } from './middlewares/error.middleware'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import path from 'path'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'

config()
const app = express()
const PORT = process.env.PORT || 4000

//Tao folder upload
initFolder()

databaseService.connect()

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(path.resolve(UPLOAD_VIDEO_DIR)))

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
