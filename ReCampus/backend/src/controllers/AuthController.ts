import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
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

      const hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash
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
        message: "Erro interno"
      });
    }
  }

  async login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos."
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos."
      });
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d"
      }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno."
    });
  }
}
static async login(req: Request, res: Response) {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Senha inválida"
      });
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d"
      }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  }
}