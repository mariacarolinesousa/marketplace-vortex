import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Todos os campos são obrigatórios."
        });
      }

      const userExists = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (userExists) {
        return res.status(400).json({
          message: "E-mail já cadastrado."
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash
        }
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro interno do servidor."
      });
    }
  }
}