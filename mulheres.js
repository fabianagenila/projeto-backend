const express = require("express"); //iniciando o express
const router = express.Router(); //configurando a primeira parte da rota
const cors = require("cors"); //pacote cors, que permite consumir a API no Frontend

const conectaBancoDeDados = require("./bancoDeDados"); //ligando ao arquivo bancoDeDados
conectaBancoDeDados(); //chamando a função que conecta o banco de dados

const Mulher = require("./mulherModel");

const app = express(); //iniciando o app
app.use(express.json());
app.use(cors());

const porta = 3333; //criando porta

//GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find();

    response.json(mulheresVindasDoBancoDeDados);
  } catch (error) {
    console.log(error);
  }
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  });

  try {
    const mulherCriada = novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch (error) {
    console.log(error);
  }
}

//PATCH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.citacao) {
      mulherEncontrada.imagem = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();

    response.json(mulherAtualizadaNoBancoDeDados);
  } catch (error) {
    console.log(error);
  }
}

//DELETE
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ mensagem: "Mulher deletada com sucesso!" });
  } catch (error) {
    console.log(error);
  }
}

app.use(router.get("/mulheres", mostraMulheres)); //rota GET/mulheres
app.use(router.post("/mulheres", criaMulher)); //rota POST/mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)); //rota PATCH/mulheres
app.use(router.delete("/mulheres/:id", deletaMulher)); //rota DELETE/mulheres

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta:", porta);
}

app.listen(porta, mostraPorta); //servidor ouvindo porta
