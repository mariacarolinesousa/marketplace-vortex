import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
    res.json({
        message: "Cadastro funcionando!"
    });
});

export default router;