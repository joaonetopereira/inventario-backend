const express = require('express');
const router = express.Router();
const usuario = [
    {
        "id":1,
        "nome":"Sypha Belnades",
        "email":"sousamacedo@gmail.com",
        "senha":"123"
    },
    {
        "id":2,
        "nome":"João Carlos",
        "email":"sousa666@gmail.com",
        "senha":"321"
    },
    {
        "id":3,
        "nome":"João Macedo",
        "email":"macedo123@gmail.com",
        "senha":"231"
    },
    {
        "id":4,
        "nome":"Baki Hamma",
        "email":"bakihamma@gmail.com",
        "senha":"222"
    },
    {
        "id":5,
        "nome":"Yuujiro Hanma",
        "email":"yuujirohanma@gmail.com",
        "senha":"666"
    },
    {
        "id":6,
        "nome":"Kaiou Retsu",
        "email":"kaiouretsu@gmail.com",
        "senha":"999"
    },
    {
        "id":7,
        "nome":"Jack Hanma",
        "email":"jackhanma@gmail.com",
        "senha":"444"
    },
    {
        "id":8,
        "nome":"Alucard",
        "email":"alucard123@gmail.com",
        "senha":"555"
    },
    {
        "id":9,
        "nome":"Trevor Belmont",
        "email":"trevorbelmont@gmail.com",
        "senha":"111"
    }
]

function validacaoEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
// para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let listausuario=usuario.filter(value=>value.id==id);
    res.status(200).send({
        mensagem: `lista de um usuário com id:${id}`,
        usuario: listausuario
    })
})
//para consultar todos os dados
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "lista de usuários",
        //nome: usuario[7].nome
    })
})

//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        mensagem: `lista de um usuário com id:${id}`,
        nome: "joao"
    })
})
// para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    if (usuario.nome.length < 3) {
        msg.push({mensagem: "Campo nome com menos de 3 caracteres!"});
        i++;
    } 
    if(validacaoEmail(usuario.email)==false) {
        msg.push({mensagem:"E-mail invalido!"});
        i++;
    }
    if(usuario.senha.length==0){
        msg.push({mensagem:"senha invalida!"})
        i++;
    }
    if(i==0){
        res.status(201).send({
            mensagem: "Dados Inseridos!",
            usuariosCriado: usuario
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
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    let dadosalterados=usuario.map((item)=>{
        if(item.id==id){
            item.nome=nome;
            item.email=email;
            item.senha=senha;
        }
    });
    if (nome.length < 3) {
        msg.push({mensagem: "Campo nome com menos de 3 caracteres!"});
        i++;
    } 
    if(validacaoEmail(email)==false) {
        msg.push({mensagem:"E-mail invalido!"});
        i++;
    }
    if(senha.length==0){
        msg.push({mensagem:"senha invalida!"})
        i++;
    }
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
    let dadosdeletados=usuario.filter(value=>value.id==id);
    let listausuario=usuario.filter(value=>value.id!=id);
    res.status(201).send({
        mensagem: "Dados deletados com sucesso!",
        dadosnovos: listausuario,
        dadodeletado: dadosdeletados
    })
})

module.exports = router;