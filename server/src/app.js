import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './docs/swagger.json' with { type: 'json' }

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors(
    {
        origin: ['http://localhost:5173'],
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

export {app}
