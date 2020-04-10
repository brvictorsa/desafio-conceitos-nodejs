const express = require("express");
const { uuid, isUuid } = require('uuidv4');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);
  next();
}

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID.' });
  }

  return next();
}

app.use(logRequests);
app.use("/repositories/:id", validateRepositoryId);

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title 
    ? repositories.filter(rep => rep.title.includes(title))
    : repositories;

  return response.status(200).json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexToUpdate = repositories.findIndex(rep => rep.id === id);
  if(indexToUpdate < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const likes = repositories[indexToUpdate].likes;
  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[indexToUpdate] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const removeFromIndex = repositories.findIndex(rep => rep.id === id);
  if(removeFromIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(removeFromIndex, 1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(rep => rep.id === id);
  if(index < 0) {
    return response.status(400).json({ error: 'Invalid operation. Repository not found' });
  }
  
  const repository = {
    id,
    title: repositories[index].title,
    url:  repositories[index].url,
    techs: repositories[index].techs,
    likes: repositories[index].likes + 1
  }

  repositories[index] = repository;

  return response.json(repository);
});

module.exports = app;
