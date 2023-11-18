require('dotenv').config();
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';


import Sessao from '../models/SessaoModel';
import { v4 as uuidv4 } from 'uuid';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}


export const criarSessao = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const identificadorUnico = uuidv4();

    const tempoExpiracao = 60 * 60 * 1000;

    const token = jwt.sign(
      { identificador: identificadorUnico },
      jwtSecret,
      { expiresIn: tempoExpiracao / 1000 } // JWT usa segundos
    );

    const novaSessao = new Sessao({
      ...req.body,
      identificador: identificadorUnico,
      token: token,
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


    if (typeof sessao.token === 'string') {
      jwt.verify(sessao.token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Sessão expirada ou inválida' });
        }
        res.status(200).json(sessao);
      });
    } else {
      return res.status(403).json({ message: 'Token inválido' });
    }
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
