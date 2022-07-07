import express from 'express';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authUser from './middleware/auth.js';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
dotenv.config()
import 'express-async-errors';
import morgan from 'morgan';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';



//routers
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js'

const app = express();

//middleware
notFoundMiddleware

if(process.env.NODE_ENV !== 'production') {

    app.use(morgan('dev'))
}




app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())



//routes middleware
app.use('/api/auth', authRoutes)
app.use('/api/jobs', authUser, jobsRoutes)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//production
if(process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))


}else {

    app.get('/', (req, res) => {
        res.send('Welcome')
    })
}



const port = process.env.PORT || 5000



const start = async () => {

    try {

        await connectDB(process.env.MONGO_URL)

        app.listen(port, () => {

            console.log(`Server is listening on port ${port}...`);
        }) 
        
    } catch (error) {

        console.log(error);
        
    }
}

start()