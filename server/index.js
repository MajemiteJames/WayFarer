import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

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
