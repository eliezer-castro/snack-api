import mongoose, { Schema } from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  sessao: String,
  cliente: String,
  itens: [{
    nome: String,
    quantidade: Number,
    preco: Number
  }],
  total: Number,

});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;
