import { Router } from "express";
import { getAllProducts } from '../controllers/produtosController'

const produtosRoutes = Router();

produtosRoutes.get('/', getAllProducts);

export { produtosRoutes };
