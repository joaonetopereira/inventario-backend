const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
// const setor = [
//     {
//         "id":1,
//         "nome":"Administrativo;",
//     },
//     {
//         "id":2,
//         "nome":"Financeiro",
//     },
//     {
//         "id":3,
//         "nome":"Recursos Humanos",
//     },
//     {
//         "id":4,
//         "nome":"Setor comercial",
//     },
//     {
//         "id":5,
//         "nome":"Setor operacional",
//     },
//     {
//         "id":6,
//         "nome":"RH",
//     },
//     {
//         "id":7,
//         "nome":"Setor de Tecnologias da Informação (TI)",
//     },
//     {
//         "id":8,
//         "nome":"Marketing",
//     },
//     {
//         "id":9,
//         "nome":"Júridico",
//     }
// ]

// function validacaoEmail(email){
//     var re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }
// para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `setor` where codset=?",[id],
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
                    mensagem: `lista de um setor com id`,
                    setor: resultado
                })
            }
        )
    })
    // let listasetor=setor.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem: `lista de um setor com id:${id}`,
    //     setor: listasetor
    // })
})
//para consultar todos os dados
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `setor`",
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
                    mensagem: `lista de todos os setores`,
                    setor: resultado
                })
            }
        )
    })
    // res.status(200).send({
    //     mensagem: "lista de setor",
    //     //nome: usuario[7].nome
    // })
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
    const setor = {
        nome: req.body.nome,
    }
    if (setor.nome.length < 3) {
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
        mysql.getConnection((error, conn) => {
            conn.query(
                "insert into  `setor` (nome) values(?)",[setor.nome],
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
                        setor: resultado.insertId
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
    //     res.status(201).send({
    //         mensagem: "Dados Inseridos!",
    //         setor: setor
    //     })
    // }else{
    //     res.status(400).send({
    //         mensagem:msg,
    //     })
    // }
})
router.patch('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const id = req.body.id;
    const nome = req.body.nome
    // let dadosalterados=setor.map((item)=>{
    //     if(item.id==id){
    //         item.nome=nome;
    //     }
    // });
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
        mysql.getConnection((error, conn) => {
            conn.query(
                "update  `setor` set nome=? where codset=?",
                [nome,id],
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
                        mensagem: `cadastro alterado com sucesso setor`,
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
    //     res.status(201).send({
    //         mensagem: "Dados alterrados!",
    //         dados:dadosalterados
    //     })
    // }else{
    //     res.status(400).send({
    //         mensagem:msg,
    //     })
    // }

    // res.status(201).send({
    //     mensagem: "Dados alterados com sucesso!"
    // })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    mysql.getConnection((error, conn) => {
        conn.query(
            `delete from setor where codset=${id}`,
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
    // let dadosdeletados=setor.filter(value=>value.id==id);
    // let listasetor=setor.filter(value=>value.id!=id);
    // res.status(201).send({
    //     mensagem: "Dados deletados com sucesso!",
    //     dadosnovos: listasetor,
    //     dadodeletado: dadosdeletados
    // })
})

module.exports = router;