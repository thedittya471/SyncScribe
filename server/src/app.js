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

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:5174'];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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
