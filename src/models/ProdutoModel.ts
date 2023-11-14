
import mongoose, { Schema } from 'mongoose';

interface Variacao {
  descricao: string;
  preco?: number;
}

interface Produto extends Document {
  produto: string;
  preco?: number;
  variacoes: Variacao[];
}

const VariacaoSchema: Schema = new Schema({
  descricao: { type: String, required: true },
  preco: { type: Number }
});

const ProdutoSchema: Schema = new Schema({
  produto: { type: String, required: true },
  preco: { type: Number },
  variacoes: [VariacaoSchema]
});

const Produto = mongoose.model('Produto', ProdutoSchema);
export default Produto;

