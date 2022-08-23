const express = require('express');
const router = express.Router();

//
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem: "lista de usuários",
        nome: "joao"
     })
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        mensagem: `lista de um usuário com id:${id}`,
        nome: "joao"
     })
})
// para enviar dados para salvar
router.post('/',(req,res,next)=>{
    
    const usuarios = {
         nome : req.body.nome,  
         email : req.body.email, 
         senha : req.body.senha
    }  
    res.status(201).send({
        mensagem:"Dados Inseridos!",
        usuariosCriado:usuarios
    })  
})

module.exports = router