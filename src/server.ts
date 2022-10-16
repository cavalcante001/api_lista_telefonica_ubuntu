import express, { Request, Response, Router } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./instances/pg";
import { Contato } from "./models/Contato";
import { Operadora } from "./models/Operadora";

const route = Router();

dotenv.config();

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

server.get("/ping", (req: Request, res: Response) => {
  try {
    sequelize.authenticate();
    console.log("successfully");
    res.json({ pong: true });
  } catch (err) {
    res.json({ pong: false });
  }
});

route.get("/contatos", async (req: Request, res: Response) => {
  const contatos = await Contato.findAll();

  const contatosList: any = [];

  for (let i in contatos) {
    const operadora = await Operadora.findOne({
      where: { id_operadora: contatos[i].id_operadora },
    });
    contatosList.push({
      nome: contatos[i].nome,
      telefone: contatos[i].telefone,
      data: contatos[i].data,
      operadora: {
        nome: operadora?.nome,
        codigo: operadora?.codigo,
        categoria: operadora?.categoria,
      },
      serial: contatos[i].serial
    });
  }

  res.json(contatosList);
});

route.get("/operadoras", async (req: Request, res: Response) => {
  const operadora = await Operadora.findAll();

  res.json(operadora);
});

route.post("/contatos", async (req: Request, res: Response) => {
  console.log(req.body);
  const novoContato = await Contato.create({
    nome: req.body.nome,
    telefone: req.body.telefone,
    data: new Date(),
    id_operadora: req.body.operadora.id_operadora,
    serial: req.body.serial
  });
  console.log(novoContato);

  res.json({});
});

server.use(route);

server.listen(process.env.PORT);
