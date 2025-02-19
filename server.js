import express from "express";
import cors from 'cors' // acessar o servidor no usuarios usando get
// 1)Tipo de rota//método HTTP 2)Endereço
// GET-> Listar //POST-> CRIAR//PUT->EDITAR VÁRIOS//PATH->EDITAR UM
// DELETE->DELETAR
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors) ////Em resumo, const app = express() é a maneira de criar uma nova
// aplicação Express que você pode configurar e usar para definir rotas e middlewares.

app.post("/usuarios", async (req, res) => {
  //precisa colocar async quando for falar de assincronas
  await prisma.user.create({
    //await na frente pois é assincrona e deve esperar uma conclusão prommise
    data: {
      email: req.body.email, //não esquecer da virgula
      name: req.body.name,
      age: req.body.age,
      
    },
  }); //para mandar pro users
  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  let users = []
  if (req.query){
    users = await prisma.user.findMany({
      where: {               //where é da onde eu pego minha informação
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
        
      }
    })
    
  } else {
    users = await prisma.user.findMany()
  }
   users = await prisma.user.findMany();
  // request(Requisição) Response(Resposta)
  res.status(200).json(users);
});

app.put("/usuarios/:id", async (req, res) => { //PUT=>editar vários
  //precisa colocar async quando for falar de assincronas
  await prisma.user.update({
    where: {
      id: req.params.id
        },
    //await na frente pois é assincrona e deve esperar uma conclusão prommise
    data: {
      email: req.body.email, //não esquecer da virgula
      name: req.body.name,
      age: req.body.age,
      
    },
  });//para mandar pro users
res.status(200).json(req.body);

})

app.delete("/usuarios/:id",async (req,res)=>{
   await prisma.user.delete({
       where: {
        id: req.params.id
       }
   })
   res.status(200).json({message: "Usuário deletado com sucesso!"});


})
  

app.listen(3000); //pra setar como local host:3000

/**Criar nossa API de Usuários
 * -Criar um usuário
 * -Listar todos os usuários
 * -Editar um usuário
 * -Deletar um usuário
 */


