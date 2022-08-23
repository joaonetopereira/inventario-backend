const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const rotausuario = require('./routes/routesUsuario');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use("/usuarios", rotausuario)
//app.use("/listapatrimonios",)
app.use(morgan('dev'));
// app.use("/somar", (req, res, next) => {
//    let a = 26;
//    let b = 5;
//    let total = 0;
//    total = a + b;
//    console.log(total)
//    res.status(200).send({
//       resultado: total
//    })
// })
// app.use("/nota", (req, res, next) => {
//    let a = 7;
//    let b = 7;
//    let c = 7;
//    let d = 7;
//    let situacao = ""
//    let total = a + b + c + d;
//    let media = total / 4;
//    if (media < 7) {
//       situacao = "Reprovado"
//    } else {
//       situacao = "Aprovado"
//    }
//    // console.log(total)
//    res.status(200).send({
//       nome: "JOAO",
//       nota1: a,
//       nota2: b,
//       nota3: c,
//       nota4: d,
//       resultado: total,
//       media: media,
//       situacao: situacao
//    })
// })
app.use((req, res, next) => {
   const erro = new Error("Não encontrado");
   erro.status(404);
   next(erro);
});
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   return res.json({
      erro: {
         mensagem: message
      }
   })
})

module.exports = app