import { Request, Response } from "express";
import prisma from "../config/prisma";

export class FavoriteController {

  async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { adId } = req.params;

      const favorite = await prisma.favorite.create({
        data: {
          userId,
          adId
        }
      });

      return res.status(201).json(favorite);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao favoritar anúncio."
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId: req.userId
        },
        include: {
          ad: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });

      return res.json(favorites);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao listar favoritos."
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {

      const { adId } = req.params;

      await prisma.favorite.delete({
        where: {
          userId_adId: {
            userId: req.userId,
            adId
          }
        }
      });

      return res.status(204).send();

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao remover favorito."
      });
    }
  }

}