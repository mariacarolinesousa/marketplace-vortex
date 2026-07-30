"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class FavoriteController {
    async create(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({
                    message: "Usuário não autenticado."
                });
            }
            const userId = req.userId;
            const adId = String(req.params.adId);
            const favorite = await prisma_1.default.favorite.create({
                data: {
                    userId,
                    adId
                }
            });
            return res.status(201).json(favorite);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao favoritar anúncio."
            });
        }
    }
    async list(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({
                    message: "Usuário não autenticado."
                });
            }
            const favorites = await prisma_1.default.favorite.findMany({
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao listar favoritos."
            });
        }
    }
    async delete(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({
                    message: "Usuário não autenticado."
                });
            }
            const adId = String(req.params.adId);
            await prisma_1.default.favorite.delete({
                where: {
                    userId_adId: {
                        userId: req.userId,
                        adId
                    }
                }
            });
            return res.status(204).send();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao remover favorito."
            });
        }
    }
}
exports.FavoriteController = FavoriteController;
