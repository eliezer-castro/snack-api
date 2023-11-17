import { Request, Response } from "express";
import Pedido from '../models/PedidoModel';
import Sessao from '../models/SessaoModel';


export const criarPedido = async (req: Request, res: Response) => {
  try {
    const sessaoId = req.params.sessaoId;
    const dadosPedido = req.body;

    const sessaoExistente = await Sessao.findOne({ identificador: sessaoId });
    if (!sessaoExistente) {
      return res.status(404).json({ message: 'Sessão não encontrada' });
    }

    if (sessaoExistente.dataExpiracao && sessaoExistente.dataExpiracao < new Date()) {
      return res.status(403).json({ message: 'Sessão expirada' });
    }

    const novoPedido = new Pedido({
      ...dadosPedido,
      sessao: sessaoId
    });

    const pedidoSalvo = await novoPedido.save();
    res.status(201).json(pedidoSalvo);
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
}



export const listarPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const obterPedidos = async (req: Request, res: Response) => {
  try {
    const sessaoId = req.params.sessaoId;
    const pedidos = await Pedido.find({ sessao: sessaoId });
    res.status(200).json(pedidos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const atualizarPedido = async (req: Request, res: Response) => {
  try {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(pedidoAtualizado);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const deletarPedido = async (req: Request, res: Response) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
