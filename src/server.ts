require('dotenv').config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { pedidosRoutes } from './routes/pedidoRoutes';
import { sessaoRoutes } from './routes/sessaoRoutes';
import { produtosRoutes } from './routes/produtosRoutes';

const app = express();
app.use(cors());
app.use(express.json());


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
