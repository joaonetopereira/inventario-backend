const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
// const lotacao = [
//     {
//         "id":1,
//         "idusu":"1",
//         "idemp":"1",
//         "idpat":"1",
//         "idset":"1",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":2,
//         "idusu":"2",
//         "idemp":"2",
//         "idpat":"2",
//         "idset":"2",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":3,
//         "idusu":"3",
//         "idemp":"3",
//         "idpat":"3",
//         "idset":"3",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":4,
//         "idusu":"4",
//         "idemp":"4",
//         "idpat":"4",
//         "idset":"4",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":5,
//         "idusu":"5",
//         "idemp":"5",
//         "idpat":"5",
//         "idset":"5",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":6,
//         "idusu":"6",
//         "idemp":"6",
//         "idpat":"6",
//         "idset":"6",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":7,
//         "idusu":"7",
//         "idemp":"7",
//         "idpat":"7",
//         "idset":"7",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":8,
//         "idusu":"8",
//         "idemp":"8",
//         "idpat":"8",
//         "idset":"8",
//         "datalotacao":"2022-08-31",
//     },
//     {
//         "id":9,
//         "idusu":"9",
//         "idemp":"9",
//         "idpat":"9",
//         "idset":"9",
//         "datalotacao":"2022-08-31",
//     }
// ]

// function validacaoEmail(email){
//     var re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }

// para consultar um determinado cadastro
router.get('/editar/:id', (req, res, next) => {
    const id = req.params.id;
   
    mysql.getConnection((error, conn) => {
        conn.query(
            "SELECT * FROM `lotacao` WHERE codlot=?",[id],
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
                    mensagem: `lista de lotação com id`,
                    lotacao: resultado
                })
            }
        )
    })
    // const id = req.params.id;
    // let listausuario=lotacao.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem: `lista de uma lotação com id:${id}`,
    //     lotação: listausuario
    // })
})
// para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT lotacao.codlot,
            usuario.nome AS usuario,
            empresas.nome AS empresas,
            setor.nome AS setor,
            patrimonio.nome AS patrimonio,
            lotacao.createAt 
            FROM lotacao
            INNER JOIN usuario ON lotacao.idUsuario = usuario.codusu
            INNER JOIN patrimonio ON lotacao.idpatrimonio = patrimonio.codpat
            INNER JOIN setor ON lotacao.idSetor = setor.codset
            INNER JOIN empresas ON lotacao.idEmpresa = empresas.codemp where lotacao.codlot=?`,[id],
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
                    lotacao: resultado
                })
            }
        )
    })
    // const id = req.params.id;
    // let listausuario=lotacao.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem: `lista de uma lotação com id:${id}`,
    //     lotação: listausuario
    // })
})
//para consultar todos os dados
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT lotacao.codlot,
            usuario.nome AS usuario,
            empresas.nome AS empresas,
            setor.nome AS setor,
            patrimonio.nome AS patrimonio,
            lotacao.createAt 
            FROM lotacao
            INNER JOIN usuario ON lotacao.idUsuario = usuario.codusu
            INNER JOIN patrimonio ON lotacao.idpatrimonio = patrimonio.codpat
            INNER JOIN setor ON lotacao.idSetor = setor.codset
            INNER JOIN empresas ON lotacao.idEmpresa = empresas.codemp`,
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
                    lotacao: resultado
                })
            }
        )
    })
    // res.status(200).send({
    //     mensagem: "lista de lotação",
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
    const lotacao = {
        idusu: req.body.idusuario,
        idemp: req.body.idempresa,
        idpat: req.body.idpatrimonio,
        idset: req.body.idsetor,
        datalotacao: req.body.datamovimentacao
    }
    console.log(lotacao)
    // if (idusu === "") {
    //     msg.push({mensagem: "Campo idusu com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (idemp === "") {
    //     msg.push({mensagem: "Campo idemp com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (idpat === "") {
    //     msg.push({mensagem: "Campo idpat com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (idset === "") {
    //     msg.push({mensagem: "Campo idset com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (datalotacao === "") {
    //     msg.push({mensagem: "Campo datalotacao com menos de 1 caractere!"});
    //     i++;
    // } 
    // if(validacaoEmail(usuario.email)==false) {
    //     msg.push({mensagem:"E-mail invalido!"});
    //     i++;
    // }
    // if(usuario.senha.length==0){
    //     msg.push({mensagem:"senha invalida!"})
    //     i++;
    // }
    if(i===0){
        mysql.getConnection((error, conn) => {
            conn.query(
                "INSERT INTO `lotacao`(idUsuario, idpatrimonio, idSetor, idEmpresa, datalotacao) values(?,?,?,?,?)",
                [lotacao.idusu,lotacao.idpat,lotacao.idset,lotacao.idemp,lotacao.datalotacao],
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
                        lotacao: resultado.insertId
                    })
                }
            )
        })
        
    //     res.status(201).send({
    //         mensagem: "Dados Inseridos!",
    //         lotação: lotacao
    //     })
    // }else{
    //     res.status(400).send({
    //         mensagem:msg,
    //     })
    }
})
router.patch('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const id = req.body.id;
    const idusu = req.body.idusuario;
    const idemp = req.body.idempresa;
    const idpat = req.body.idpatrimonio;
    const idset = req.body.idsetor;
    const datalotacao = req.body.datalotacao;
    // let dadosalterados=lotacao.map((item)=>{
    //     if(item.id==id){
    //         item.idusu=idusu;
    //         item.idemp=idemp;
    //         item.idpat=idpat;
    //         item.idset=idset;
    //         item.datalotacao=datalotacao;
    //     }
    // });
    // if (idusu == 0) {
    //     msg.push({mensagem: "Campo idusu com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (idemp == 0) {
    //     msg.push({mensagem: "Campo idemp com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (idpat == 0) {
    //     msg.push({mensagem: "Campo idpat com menos de 1 caractere!"});
    //     i++;
    // } 
    // if (idset == 0) {
    //     msg.push({mensagem: "Campo idset com menos de 1 caractere!"});
    //     i++;
    // }
    // if (datalotacao == "") {
    //     msg.push({mensagem: "Campo datalotacao com menos de 1 caractere!"});
    //     i++;
    // }  
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
                "update  `lotacao` set idUsuario=?,idpatrimonio=?,idSetor=?,idEmpresa=?,datalotacao=? where codlot=?",
                [idusu,idpat,idset,idemp,datalotacao,id],
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
                        mensagem: `cadastro alterado com sucesso`,
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
    

    // res.status(201).send({
    //     mensagem: "Dados alterados com sucesso!"
    // })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    // let dadosdeletados=lotacao.filter(value=>value.id==id);
    // let listausuario=lotacao.filter(value=>value.id!=id);
    // res.status(201).send({
    //     mensagem: "Dados deletados com sucesso!",
    //     dadosnovos: listausuario,
    //     dadodeletado: dadosdeletados
    // })
    mysql.getConnection((error, conn) => {
        conn.query(
            `delete from lotacao where codlot=${id}`,
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