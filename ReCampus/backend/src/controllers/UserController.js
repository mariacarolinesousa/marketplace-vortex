"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class UserController {
    async me(req, res) {
        try {
            const user = await prisma_1.default.user.findUnique({
                where: {
                    id: req.userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado.",
                });
            }
            return res.json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno."
            });
        }
    }
    async myAds(req, res) {
        try {
            const ads = await prisma_1.default.ad.findMany({
                where: {
                    userId: req.userId
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            return res.json(ads);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar anúncios."
            });
        }
    }
}
exports.UserController = UserController;
