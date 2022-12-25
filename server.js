import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authUser from './middleware/auth.js';

import dotenv from 'dotenv';
dotenv.config()
import connectDB from './db/connect.js';
import 'express-async-errors';
import morgan from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
//routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

const app = express()


//morgan
if(process.env.NODE_ENV !== 'production') {

    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))

//express json
app.use(express.json())
app.use(cookieParser())

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
//routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', authUser, jobsRouter);

app.get('*', (req, res) => {

  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

//middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL)
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  start()