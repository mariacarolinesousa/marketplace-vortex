import express from "express";
import cors from "cors";

const app = express();

//fazendo requisições com o frontend
app.use(cors());

//recebendo json 
app.use(express.json());

//fazendo rota de teste 
app.get("/", (req, res) => { res.json({ message: "API do ReCampus funcionando!"
});
});

export default app;