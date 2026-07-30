"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//fazendo requisições com o frontend
app.use((0, cors_1.default)());
//recebendo json 
app.use(express_1.default.json());
//fazendo rota de teste 
app.get("/", (req, res) => {
    res.json({ message: "API do ReCampus funcionando!"
    });
});
exports.default = app;
