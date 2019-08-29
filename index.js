var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
type Estudante {
  id: ID
  nome: String
  sobrenome: String
  idade: Int
  responsaveis:[Responsavel]
}

type Responsavel {
  parentesco: String
  nome: String
  idade: Int
}

type Query {
  nome: String
  data: String
  alunos: [Estudante]
  responsaveis: [Responsavel]
}`);

const alunos = [{
  id: 1,
  nome: "Lincoln",
  sobrenome: "Morais de Melo",
  idade: 30
}, {
  id: 2,
  nome: "Beatriz",
  sobrenome: "Vicente de lemos",
  idade: 26
}]

const responsaveis = [{
  parentesco: "Pai",
  nome: "alexandre",
  idade: 48,
  aluno_id: 1
},{
  parentesco: "Mãe",
  nome: "Maria do Carmo",
  idade: 53,
  aluno_id: 2
}]

var root = { 
    alunos: () => {
      teste = alunos
      teste.responsaveis = responsaveis

      // teste.responsaveis = responsaveis.map(resp => {
      //   if (responsaveis.aluno_id === alunos.aluno_id){
      //     return resp
      //   }
      //   return []
      // })
      console.log("\n teste Alunos: ", teste)
      return teste
    },
    responsaveis: () => {
      return responsaveis
    },
    nome: () => 'Teste Lincoln',
    data: () => new Date,

 };

var app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Executando em localhost:4000/'));