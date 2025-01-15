import express from 'express';
import cors from 'cors';
import searchRoute from './routes/searchRoute';

require 
('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/search', searchRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
