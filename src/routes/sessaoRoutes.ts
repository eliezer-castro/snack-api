import { Router } from "express";
import { criarSessao, obterSessao, atualizarSessao, deletarSessao } from '../controllers/sessaoController';

const sessaoRoutes = Router();

sessaoRoutes.post('/', criarSessao);
sessaoRoutes.get('/:id', obterSessao);
sessaoRoutes.put('/:id', atualizarSessao);
sessaoRoutes.delete('/:id', deletarSessao);

export { sessaoRoutes };
