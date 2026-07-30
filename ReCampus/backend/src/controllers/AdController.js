"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const adValidation_1 = require("../validations/adValidation");
const uploadImage_1 = require("../services/uploadImage");
class AdController {
    async create(req, res) {
        try {
            console.log("Body:", req.body);
            console.log("File:", req.file);
            console.log("User:", req.userId);
            const validation = adValidation_1.adSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json(validation.error);
            }
            const { title, description, category, condition, location, price, isDonation, } = validation.data;
            const userId = req.userId;
            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem obrigatória.",
                });
            }
            const imageUrl = await (0, uploadImage_1.uploadImage)(req.file);
            const ad = await prisma_1.default.ad.create({
                data: {
                    title,
                    description,
                    category,
                    condition,
                    location,
                    price,
                    imageUrl,
                    isDonation,
                    userId,
                },
            });
            return res.status(201).json(ad);
        }
        catch (error) {
            console.error("Erro ao criar anúncio:");
            console.error(error);
            return res.status(500).json({
                message: "Erro interno.",
                error: String(error),
            });
        }
    }
    async list(req, res) {
        try {
            const { search } = req.query;
            const ads = await prisma_1.default.ad.findMany({
                where: search
                    ? {
                        OR: [
                            {
                                title: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                            {
                                description: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                        ],
                    }
                    : undefined,
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: String(error),
            });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const ad = await prisma_1.default.ad.findUnique({
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
            await prisma_1.default.ad.update({
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar anúncio."
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            const { title, description, category, condition, location, price, isDonation, } = req.body;
            const ad = await prisma_1.default.ad.findUnique({
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
                await (0, uploadImage_1.deleteImage)(ad.imageUrl);
                imageUrl = await (0, uploadImage_1.uploadImage)(req.file);
            }
            const updatedAd = await prisma_1.default.ad.update({
                where: {
                    id
                },
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    condition: req.body.condition,
                    location: req.body.location,
                    price: req.body.price,
                    isDonation: req.body.isDonation === "true",
                    imageUrl
                },
            });
            return res.json(updatedAd);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao atualizar anúncio."
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            const ad = await prisma_1.default.ad.findUnique({
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
                await (0, uploadImage_1.deleteImage)(ad.imageUrl);
            }
            await prisma_1.default.ad.delete({
                where: {
                    id
                }
            });
            return res.status(204).send();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao excluir anúncio."
            });
        }
    }
    async myAds(req, res) {
        try {
            const userId = req.userId;
            const ads = await prisma_1.default.ad.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.json(ads);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao listar anúncios.",
            });
        }
    }
}
exports.AdController = AdController;
