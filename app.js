import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';


const app = express();


// MongoDB
mongoose.connect('mongodb://localhost/api', {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;


// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());


// Routes
app.use('/auth', userRoutes);


// Catch 404 Errors
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});


// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});