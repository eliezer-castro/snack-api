import mongoose from 'mongoose';

const historicoSchema = new mongoose.Schema({
  pedidoId: mongoose.Schema.Types.ObjectId,
  dataHora: Date,
  status: String,
});

const Historico = mongoose.model('Historico', historicoSchema);

export default Historico;
