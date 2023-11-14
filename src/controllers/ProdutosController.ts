
import { Request, Response } from 'express';
import Produto from './../models/ProdutoModel';


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const produtos = await Produto.find();
    return res.json(produtos);
  } catch (error) {

    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
}


// Aqui você pode adicionar mais métodos para lidar com operações CRUD.

