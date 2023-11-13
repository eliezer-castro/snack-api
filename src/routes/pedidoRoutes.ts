import { Router } from "express";
import { criarPedido, listarPedidos, obterPedidos, atualizarPedido, deletarPedido } from "../controllers/pedidoController";

const pedidosRoutes = Router();

pedidosRoutes.post('/sessao/:sessaoId', criarPedido);
pedidosRoutes.get('/sessao/:sessaoId', obterPedidos);
pedidosRoutes.put('/:id', atualizarPedido);
pedidosRoutes.delete('/:id', deletarPedido);

export { pedidosRoutes };