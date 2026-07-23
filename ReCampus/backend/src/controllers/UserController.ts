import { Request, Response } from "express";
import prisma from "../config/prisma";

export class UserController {

  async me(req: Request, res: Response) {

    try {

      const user = await prisma.user.findUnique({

        where: {
          id: req.userId
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }

      });

      return res.json(user);

    } catch {

      return res.status(500).json({
        message: "Erro interno."
      });

    }

  }

  async myAds(req: Request, res: Response) {
  try {

    const ads = await prisma.ad.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(ads);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar anúncios."
    });
  }
}

}