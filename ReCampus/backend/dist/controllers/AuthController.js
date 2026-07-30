"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios."
                });
            }
            const userExists = await prisma_1.default.user.findUnique({
                where: {
                    email
                }
            });
            if (userExists) {
                return res.status(400).json({
                    message: "E-mail já cadastrado."
                });
            }
            const hash = await bcrypt_1.default.hash(password, 10);
            const user = await prisma_1.default.user.create({
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno"
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma_1.default.user.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                return res.status(401).json({
                    message: "E-mail ou senha inválidos."
                });
            }
            const passwordMatch = await bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: "E-mail ou senha inválidos."
                });
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            });
            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro interno."
            });
        }
    }
}
exports.AuthController = AuthController;
