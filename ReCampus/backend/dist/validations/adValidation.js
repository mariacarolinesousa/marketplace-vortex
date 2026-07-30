"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adSchema = void 0;
const zod_1 = require("zod");
exports.adSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Título obrigatório"),
    description: zod_1.z.string().min(10, "Descrição muito curta"),
    category: zod_1.z.string().min(2),
    condition: zod_1.z.string().min(2),
    location: zod_1.z.string().min(2),
    price: zod_1.z.coerce.number(),
    isDonation: zod_1.z.coerce.boolean()
});
