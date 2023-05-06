const express = require('express')

const app = express()
const porta = 3333

function mostraPorta(){
    console.log('Servidor criado e rodando na porta:', porta);
}

//ouvindo a porta e mostrando com o mostraPorta que está tudo ok!
app.listen(porta, mostraPorta)