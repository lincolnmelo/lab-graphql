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
  nome: "João",
  sobrenome: "silva",
  idade: 30,
  responsaveis: [{
    parentesco: "Pai",
    nome: "alexandre",
    idade: 48,
    aluno_id: 1
  }]
}, {
  id: 2,
  nome: "Luna",
  sobrenome: "puert",
  idade: 26,
  responsaveis: [{
    parentesco: "Mãe",
    nome: "Maria do Carmo",
    idade: 53,
    aluno_id: 2
  }]
}]

,
responsaveis = [{
  parentesco: "Pai",
  nome: "alexandre",
  idade: 48,
  aluno_id: 1
},{
  
}]



var root = { 
    alunos: () => {
     return alunos
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