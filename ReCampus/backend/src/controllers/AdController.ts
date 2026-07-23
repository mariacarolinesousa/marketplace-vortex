import { Request, Response } from "express";
import prisma from "../config/prisma";

export class AdController {

  async create(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        category,
        price,
        imageUrl,
        isDonation
      } = req.body;

      const userId = req.userId

      const ad = await prisma.ad.create({
        data: {
          title,
          description,
          category,
          price,
          imageUrl,
          isDonation,
          userId
        }
      });

      return res.status(201).json(ad);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao criar anúncio"
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const ads = await prisma.ad.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      return res.json(ads);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao listar anúncios."
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const ad = await prisma.ad.findUnique({
        where: {
          id: req.params.id
        },
        include: {
          user: true
        }
      });

      if (!ad) {
        return res.status(404).json({
          message: "Anúncio não encontrado."
        });
      }

      return res.json(ad);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao buscar anúncio."
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const ad = await prisma.ad.update({
        where: {
          id: req.params.id
        },
        data: req.body
      });

      return res.json(ad);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao atualizar anúncio."
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await prisma.ad.delete({
        where: {
          id: req.params.id
        }
      });

      return res.status(204).send();

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao excluir anúncio."
      });
    }
  }

}