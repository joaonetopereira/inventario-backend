const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
// const empresas = [
//     {
//         "id": 1,
//         "nome": "C&A",
//         "responsavel": "João neto",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 2,
//         "nome": "McDonald's",
//         "responsavel": "Chris Kempczinski",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 3,
//         "nome": "Burger King",
//         "responsavel": "Jose E. Cil",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 4,
//         "nome": "KFC",
//         "responsavel": "Coronel Sanders, Pete Harman",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 5,
//         "nome": "Pizza Hut",
//         "responsavel": "Aaron Powell",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 6,
//         "nome": "Subway",
//         "responsavel": "John Chidsey",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 7,
//         "nome": "The Wendy's Company",
//         "responsavel": "Todd Penegor",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 8,
//         "nome": "Arby's",
//         "responsavel": "Paul J. Brown",
//         "contato": "+55 63 99130-2020"
//     },
//     {
//         "id": 9,
//         "nome": "DQ Corp.",
//         "responsavel": "Troy Bader",
//         "contato": "+55 63 99130-2020"
//     }
// ]

// function validacaoEmail(email){
//     var re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }
// para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // let listaempresas = empresas.filter(value => value.id == id);
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `empresas` where codemp=?", [id],
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
                    mensagem: `lista de uma empresa com id:${id}`,
                    empresas: resultado
                })
            }
        )
    })

})
//para consultar todos os dados
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `empresas`",
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
                    mensagem: "lista de empresas",
                    empresas: resultado
                    //nome: usuario[7].nome
                })
            })
    }
    )
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
   
    const empresas = {
        nome: req.body.nome,
        responsavel: req.body.responsavel,
        contato: req.body.contato
    }
    if (empresas.nome.length < 3) {
        msg.push({ mensagem: "Campo nome com menos de 3 caracteres!" });
        i++;

    }
    console.log(empresas)
    // if(validacaoEmail(usuario.email)==false) {
    //     msg.push({mensagem:"E-mail invalido!"});
    //     i++;
    // }
    // if(usuario.senha.length==0){
    //     msg.push({mensagem:"senha invalida!"})
    //     i++;
    // }
    if (i == 0) {
        mysql.getConnection((error, conn) => {
            conn.query(
                "insert into  `empresas` (nome,responsavel,contato) values(?,?,?)", 
                [empresas.nome, empresas.responsavel, empresas.contato],
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
                        mensagem: "Dados Inseridos!",
                        empresas: resultado.insertId
                    })
                }
            )
        })
        
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
    const responsavel = req.body.responsavel;
    const contato = req.body.contato;
    // let dadosalterados = empresas.map((item) => {
    //     if (item.id == id) {
    //         item.nome = nome;
    //         item.responsavel = responsavel;
    //         item.contato = contato;
    //     }
    // });
    if (nome.length < 3) {
        msg.push({ mensagem: "Campo nome com menos de 3 caracteres!" });
        i++;
    }
    if (i == 0) {
        mysql.getConnection((error, conn) => {
            conn.query(
                "update  `empresas` set nome=?,responsavel=?,contato=? where codemp=?",
                [nome,responsavel,contato,id],
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
        //     mensagem: "Dados alterrados!",
        //     dados: dadosalterados
        // })
    // } else {
    //     res.status(400).send({
    //         mensagem: msg,
    //     })
    // }

    // res.status(201).send({
    //     mensagem: "Dados alterados com sucesso!"
    // })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    // let dadosdeletados = empresas.filter(value => value.id == id);
    // let listausuario = empresas.filter(value => value.id != id);
    // res.status(201).send({
    //     mensagem: "Dados deletados com sucesso!",
    //     dadosnovos: listausuario,
    //     dadodeletado: dadosdeletados
    // })
    mysql.getConnection((error, conn) => {
        conn.query(
            `delete from empresas where codemp=${id}`,
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