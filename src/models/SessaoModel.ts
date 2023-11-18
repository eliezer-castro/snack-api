import mongoose from 'mongoose';

const sessaoSchema = new mongoose.Schema({
  nome: String,
  chavePIX: String,
  dataCriacao: { type: Date, default: Date.now },
  identificador: String,
  dataExpiracao: Date,
  token: String,
});

const Sessao = mongoose.model('Sessao', sessaoSchema);

export default Sessao;
