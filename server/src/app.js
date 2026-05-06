import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './docs/swagger.json'), 'utf-8')
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import healthcheckRouter from './routes/healthcheck.routes.js'
import userRouter from './routes/user.routes.js'
import fileRouter from './routes/file.routes.js'


app.use('/api/v1/healthcheck', healthcheckRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/files', fileRouter)

export { app }
