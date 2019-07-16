import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import router from './routes/index';
import swaggerDocument from '../wayfarer.json';
import '@babel/polyfill';

const app = express();

// Parse incoming requests data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api/v1/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to WayFarer App!',
}));

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Endpoint does not exist',
}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
