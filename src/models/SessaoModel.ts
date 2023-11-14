import mongoose from 'mongoose';

const sessaoSchema = new mongoose.Schema({
  nome: String,
  chavePIX: String,
  validade: Date,
  identificador: String,
});

const Sessao = mongoose.model('Sessao', sessaoSchema);

export default Sessao;
