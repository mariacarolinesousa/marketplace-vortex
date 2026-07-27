import { Request, Response } from "express";
import prisma from "../config/prisma";
import { adSchema } from "../validations/adValidation";
import { uploadImage, deleteImage } from "../services/uploadImage";


export class AdController {


  async create(req: Request, res: Response) {

    try {

      const validation = adSchema.safeParse(req.body);


      if (!validation.success) {

        return res.status(400).json({
          errors: validation.error.flatten().fieldErrors
        });

      }


      const {
        title,
        description,
        category,
        condition,
        location,
        price,
        isDonation
      } = validation.data;


      const userId = req.userId;


      const file = req.file;


      if (!file) {

        return res.status(400).json({
          message: "Imagem obrigatória."
        });

      }


      const imageUrl = await uploadImage(file);


      const ad = await prisma.ad.create({

        data: {

          title,

          description,

          category,

          condition,

          location,

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

        message: "Erro ao criar anúncio."

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
          },
        },
      },
    });

    return res.json(ads);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: String(error),
    });
  }
}

    async show(req: Request, res: Response) {

    try {

      const { id } = req.params;


      const ad = await prisma.ad.findUnique({

        where: {

          id

        },


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



      if (!ad) {

        return res.status(404).json({

          message: "Anúncio não encontrado."

        });

      }



      // aumenta visualizações

      await prisma.ad.update({

        where: {

          id

        },

        data: {

          views: {

            increment: 1

          }

        }

      });



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

      const { id } = req.params;

      const userId = req.userId;



      const ad = await prisma.ad.findUnique({

        where: {

          id

        }

      });



      if (!ad) {

        return res.status(404).json({

          message: "Anúncio não encontrado."

        });

      }



      if (ad.userId !== userId) {

        return res.status(403).json({

          message: "Você não pode editar este anúncio."

        });

      }



      let imageUrl = ad.imageUrl;



      // Se enviar nova imagem

      if (req.file) {


        await deleteImage(ad.imageUrl);


        imageUrl = await uploadImage(req.file);


      }



      const updatedAd = await prisma.ad.update({

        where: {

          id

        },


        data: {

          ...req.body,

          imageUrl

        }

      });



      return res.json(updatedAd);



    } catch (error) {


      console.error(error);


      return res.status(500).json({

        message: "Erro ao atualizar anúncio."

      });


    }

  }

    async delete(req: Request, res: Response) {

    try {

      const { id } = req.params;

      const userId = req.userId;



      const ad = await prisma.ad.findUnique({

        where: {

          id

        }

      });



      if (!ad) {

        return res.status(404).json({

          message: "Anúncio não encontrado."

        });

      }



      if (ad.userId !== userId) {

        return res.status(403).json({

          message: "Você não pode excluir este anúncio."

        });

      }



      // Remove imagem do Supabase Storage

      if (ad.imageUrl) {

        await deleteImage(ad.imageUrl);

      }



      await prisma.ad.delete({

        where: {

          id

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