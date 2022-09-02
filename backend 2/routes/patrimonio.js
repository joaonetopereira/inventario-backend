const express = require('express');
const router = express.Router();
const patrimonio = [
    {
        "id":1,
        "nome":"cadeiras",
    },
    {
        "id":2,
        "nome":"carros",
    },
    {
        "id":3,
        "nome":"celulares",
    },
    {
        "id":4,
        "nome":"bicicletas",
    },
    {
        "id":5,
        "nome":"mesas",
    },
    {
        "id":6,
        "nome":"computadores",
    },
    {
        "id":7,
        "nome":"camas",
    },
    {
        "id":8,
        "nome":"motos",
    },
    {
        "id":9,
        "nome":"bebedouros",
    }
]

// function validacaoEmail(email){
//     var re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }
// para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let listapatrimonio=patrimonio.filter(value=>value.id==id);
    res.status(200).send({
        mensagem: `lista de um patrimonio com id:${id}`,
        patrimonio: listapatrimonio
    })
})
//para consultar todos os dados
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "lista de patrimonio",
        //nome: usuario[7].nome
    })
})

//para consultar um determinado cadastro
// router.get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     res.status(200).send({
//         mensagem: `lista de um usuário com id:${id}`,
//         nome: "joao"
//     })
// })


// para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const patrimonio = {
        nome: req.body.nome,
    }
    if (patrimonio.nome.length < 3) {
        msg.push({mensagem: "Campo nome com menos de 3 caracteres!"});
        i++;
    } 
    // if(validacaoEmail(usuario.email)==false) {
    //     msg.push({mensagem:"E-mail invalido!"});
    //     i++;
    // }
    // if(usuario.senha.length==0){
    //     msg.push({mensagem:"senha invalida!"})
    //     i++;
    // }
    if(i==0){
        res.status(201).send({
            mensagem: "Dados Inseridos!",
            patrimonio: patrimonio
        })
    }else{
        res.status(400).send({
            mensagem:msg,
        })
    }
})
router.patch('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const id = req.body.id;
    const nome = req.body.nome
    let dadosalterados=patrimonio.map((item)=>{
        if(item.id==id){
            item.nome=nome;
        }
    });
    if (nome.length < 3) {
        msg.push({mensagem: "Campo nome com menos de 3 caracteres!"});
        i++;
    } 
    // if(validacaoEmail(email)==false) {
    //     msg.push({mensagem:"E-mail invalido!"});
    //     i++;
    // }
    // if(senha.length==0){
    //     msg.push({mensagem:"senha invalida!"})
    //     i++;
    // }
    if(i==0){
        res.status(201).send({
            mensagem: "Dados alterrados!",
            dados:dadosalterados
        })
    }else{
        res.status(400).send({
            mensagem:msg,
        })
    }

    // res.status(201).send({
    //     mensagem: "Dados alterados com sucesso!"
    // })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    let dadosdeletados=patrimonio.filter(value=>value.id==id);
    let listausuario=patrimonio.filter(value=>value.id!=id);
    res.status(201).send({
        mensagem: "Dados deletados com sucesso!",
        dadosnovos: listausuario,
        dadodeletado: dadosdeletados
    })
})

module.exports = router;