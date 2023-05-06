const express = require('express') //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
// const { v4: uuidv4 } = require('uuid'); //usando a biblioteca uuid
const cors = require('cors') //permite consumir a api no front-end

const conectaBancoDeDados = require('./bancoDeDados') //ligando ao arquivo banco de dados
conectaBancoDeDados() //chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use(express.json()) //tratando as requisições com o formato JSON
app.use(cors())
const porta = 3333 //criando a porta

//GET
async function mostraMulheres(request, response){
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request, response){
    const novaMulher = new Mulher ({
        // id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    // mulheres.push(novaMulher) //enviando a nova mulher para o array de mulheres

    // response.json(mulheres) //usando o JSON para enviar todas as mulheres
    try {
        const mulherCriada = await novaMulher.save() //abstração para criar uma mulher no MongoDB
        response.status(201).json(mulherCriada) //201 - resposta criada
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    // function encontraMulher(mulher){
    //     if(mulher.id === request.params.id){
    //         return mulher
    //     }
    // }
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id) //encontrando a mulher a partir do id passado na url
        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
    
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
    
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }

        if(request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

        } catch (erro) {
        console.log(erro)
    }

    // const mulherEncontrada = mulheres.find(encontraMulher)
}

//DELETE
async function deletaMulher(request, response){
    // function todasMenosEla(mulher){
    //     if(mulher.id !== request.params.id){
    //         return mulher
    //     }
    // }
    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso!'})
    } catch(erro){
        console.log(erro)
    }

    // const mulheresQueFicam = mulheres.filter(todasMenosEla);
    // response.json(mulheresQueFicam)
}

app.use(router.get('/mulheres', mostraMulheres)) //rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))//rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher))//rota DELETE /mulheres/:id

//porta
function mostraPorta(){
    console.log('Servidor criado e rodando na porta:', porta);
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta