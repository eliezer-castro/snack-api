import { Router } from "express";
import { criarPedido, listarPedidos, obterPedidos, atualizarPedido, deletarPedido } from "../controllers/PedidoController";
const pedidosRoutes = Router();

pedidosRoutes.post('/sessao/:sessaoId', criarPedido);
pedidosRoutes.get('/sessao/:sessaoId', obterPedidos);
pedidosRoutes.put('/:id', atualizarPedido);
pedidosRoutes.delete('/:id', deletarPedido);

export { pedidosRoutes };