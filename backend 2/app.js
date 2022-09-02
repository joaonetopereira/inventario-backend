const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const usuario = require('./routes/usuario');
const empresa = require('./routes/empresa');
const patrimonio = require('./routes/patrimonio');
const setor = require('./routes/setor');
const lotacao = require('./routes/lotacao');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req,res,next)=>{
   res.header('Access-Control-Alow-Origin','*');
   res.header('Access-Control-Alow-Header','Origin,X-Requerested-with, Content-Type, Accept,Authorizatin');
   if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
      return res.status(200).send({});
   }
   next();
})
app.use("/usuario", usuario);
app.use("/empresas", empresa);
app.use("/patrimonio", patrimonio);
app.use("/setor", setor);
app.use("/lotacao", lotacao);

app.use((req, res, next) => {
   const erro = new Error("Não encontrado");
   erro.status(404);
   next(erro);
});
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   return res.json({
      erro: {
         mensagem:error.message
      }
   })
})

module.exports = app