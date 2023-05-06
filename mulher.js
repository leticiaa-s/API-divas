const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraMulher(request, response) {
  response.json(
    {
    nome: "Letícia Santos",
    imagem: "https://avatars.githubusercontent.com/u/105301040?v=4",
    minibio: "Desenvolvedora Full Stack em formação",
  }
  );
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/mulher", mostraMulher));
app.listen(porta, mostraPorta);
