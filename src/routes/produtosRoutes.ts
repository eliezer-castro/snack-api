import { Router } from "express";
import { getAllProducts } from '../controllers/ProdutosController';

const produtosRoutes = Router();

produtosRoutes.get('/', getAllProducts);

export { produtosRoutes };
