const { response, application } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;


// const usuario = [
//     {
//         "id": 1,
//         "nome": "Sypha Belnades",
//         "email": "sousamacedo@gmail.com",
//         "senha": "123"
//     },
//     {
//         "id": 2,
//         "nome": "João Carlos",
//         "email": "sousa666@gmail.com",
//         "senha": "321"
//     },
//     {
//         "id": 3,
//         "nome": "João Macedo",
//         "email": "macedo123@gmail.com",
//         "senha": "231"
//     },
//     {
//         "id": 4,
//         "nome": "Baki Hamma",
//         "email": "bakihamma@gmail.com",
//         "senha": "222"
//     },
//     {
//         "id": 5,
//         "nome": "Yuujiro Hanma",
//         "email": "yuujirohanma@gmail.com",
//         "senha": "666"
//     },
//     {
//         "id": 6,
//         "nome": "Kaiou Retsu",
//         "email": "kaiouretsu@gmail.com",
//         "senha": "999"
//     },
//     {
//         "id": 7,
//         "nome": "Jack Hanma",
//         "email": "jackhanma@gmail.com",
//         "senha": "444"
//     },
//     {
//         "id": 8,
//         "nome": "Alucard",
//         "email": "alucard123@gmail.com",
//         "senha": "555"
//     },
//     {
//         "id": 9,
//         "nome": "Trevor Belmont",
//         "email": "trevorbelmont@gmail.com",
//         "senha": "111"
//     }
// ]

function validacaoEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
// para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `usuario` where codusu=?",[id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                // const id = req.params.id;
                // let listausuario = usuario.filter(value => value.id == id);
                res.status(200).send({
                    mensagem: `lista de um usuário com id`,
                    usuario: resultado
                })
            }
        )
    })

})
router.post('/logar',(req,res,next)=>{
    const{email,senha}=req.body;
    mysql.getConnection((error,conn)=>{
     conn.query(
       "SELECT * FROM usuario where email like ? and senha like ?",
       [email,senha],
       (error,resultado,field)=>{
         conn.release();
         if(error){
          return res.status(500).send({
             error:error,
             response:null
           })
         }
         res.status(200).send({
           mensagem:"Dados do Usuário!!!!",
           usuario:resultado
         
         })
        }
       )
     })

})
//para consultar todos os dados
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `usuario`",
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                // const id = req.params.id;
                // let listausuario = usuario.filter(value => value.id == id);
                res.status(200).send({
                    mensagem: `lista de todos usuário`,
                    usuario: resultado
                })
            }
        )
    })
})

//para consultar um determinado cadastro
router.get('/', (req, res, next) => {
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
        msg.push({ mensagem: "Campo nome com menos de 3 caracteres!" });
        i++;
    }
    if (validacaoEmail(usuario.email) == false) {
        msg.push({ mensagem: "E-mail invalido!" });
        i++;
    }
    if (usuario.senha.length == 0) {
        msg.push({ mensagem: "senha invalida!" })
        i++;
    }
    if (i == 0) {
        mysql.getConnection((error, conn) => {
            conn.query(
                "insert into  `usuario` (nome,email,senha) values(?,?,?)",[usuario.nome,usuario.email,usuario.senha],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    // const id = req.params.id;
                    // let listausuario = usuario.filter(value => value.id == id);
                    res.status(201).send({
                        mensagem: `cadastrado com sucesso`,
                        usuario: resultado.insertId
                    })
                }
            )
        })
        // res.status(201).send({
        //     mensagem: "Dados Inseridos!",
        //     usuariosCriado: resultado.insertId
        // })
    } else {
        res.status(400).send({
            mensagem: msg,
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
    // let dadosalterados = usuario.map((item) => {
    //     if (item.id == id) {
    //         item.nome = nome;
    //         item.email = email;
    //         item.senha = senha;
    //     }
    // });
    if (nome.length < 3) {
        msg.push({ mensagem: "Campo nome com menos de 3 caracteres!" });
        i++;
    }
    if (validacaoEmail(email) == false) {
        msg.push({ mensagem: "E-mail invalido!" });
        i++;
    }
    if (senha.length == 0) {
        msg.push({ mensagem: "senha invalida!" })
        i++;
    }
    if (i == 0) {
        mysql.getConnection((error, conn) => {
            conn.query(
                "update  `usuario` set nome=?,email=?,senha=? where codusu=?",
                [nome,email,senha,id],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    // const id = req.params.id;
                    // let listausuario = usuario.filter(value => value.id == id);
                    res.status(201).send({
                        mensagem: `cadastro alterado com sucesso usuário`,
                        //usuario: resultado.insertId
                    })
                }
            )
        })
    } else {
        res.status(400).send({
            mensagem: msg,
        })
    }

    // res.status(201).send({
    //     mensagem: "Dados alterados com sucesso!"
    // })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    // let dadosdeletados = usuario.filter(value => value.id == id);
    // let listausuario = usuario.filter(value => value.id != id);
    // res.status(201).send({
    //     mensagem: "Dados deletados com sucesso!",
    //     dadosnovos: listausuario,
    //     dadodeletado: dadosdeletados
    // })
    mysql.getConnection((error, conn) => {
        conn.query(
            `delete from usuario where codusu=${id}`,
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                // const id = req.params.id;
                // let listausuario = usuario.filter(value => value.id == id);
                res.status(201).send({
                    mensagem: `cadastro deletado com sucesso`
                })
            }
        )
    })
})

module.exports = router;