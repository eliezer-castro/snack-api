import { Request, Response } from "express";
import Sessao from '../models/SessaoModel';
import { v4 as uuidv4 } from 'uuid';


export const criarSessao = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const identificadorUnico = uuidv4();
    // const tempoExpiracao = 1 * 60 * 60 * 1000;
    const tempoExpiracao = 30 * 1000;

    const novaSessao = new Sessao({
      ...req.body,
      identificador: identificadorUnico,
      dataExpiracao: new Date(Date.now() + tempoExpiracao)
    });

    const sessaoSalva = await novaSessao.save();
    res.status(201).json(sessaoSalva);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const obterSessao = async (req: Request, res: Response) => {
  try {
    const identificador = req.params.id;
    const sessao = await Sessao.findOne({ identificador: identificador });
    if (!sessao) {
      return res.status(404).json({ message: 'Sessão não encontrada' });
    }
    if (sessao.dataExpiracao && sessao.dataExpiracao < new Date()) {
      return res.status(403).json({ message: 'Sessão expirada' });
    }

    res.status(200).json(sessao);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const atualizarSessao = async (req: Request, res: Response) => {
  try {
    const sessaoAtualizada = await Sessao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(sessaoAtualizada);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const deletarSessao = async (req: Request, res: Response) => {
  try {
    await Sessao.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Sessão deletada com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
