const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepoId(request, response, next){
  const {id} = request.params

  if(!isUuid(id)){
    return response.status(400).json({error: "Invalid repository ID."})
  }

  return next()
}

app.use('projects/:id', validateRepoId)
app.use('projects/:id/like', validateRepoId)


app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body

  const repository = { 
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params
  const {title, url, techs} = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }
  const {title, url, techs} = repositories[repositoryIndex]
  var {likes} = repositories[repositoryIndex]

  likes++

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex].likes = likes

  return response.json(repository)
  
});

module.exports = app;
