require('dotenv').config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { pedidosRoutes } from './routes/pedidoRoutes';
import { sessaoRoutes } from './routes/sessaoRoutes';
import { produtosRoutes } from './routes/produtosRoutes';

const app = express();
app.use(express.json());

app.use((req, res, next) => {

  // Qualquer endereço pode fazer requisição "*"
  res.header("Access-Control-Allow-Origin", "*");

  // Tipos de método que a API aceita
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  // Permitir o envio de dados para API
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Executar o cors
  app.use(cors());

  // Quando não houver erro deve continuar o processamento
  next();
});


app.use('/pedidos', pedidosRoutes);
app.use('/sessao', sessaoRoutes);
app.use('/produtos', produtosRoutes);


const CONNECTION_STRING = process.env.MONGODB_URI;

if (!CONNECTION_STRING) {
  console.error('Erro: A string de conexão com o MongoDB não está definida.');
  process.exit(1);
}

mongoose.connect(CONNECTION_STRING).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar com o MongoDB', err);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
