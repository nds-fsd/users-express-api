const express = require("express");
const users = require("./data");

const app = express();
app.use(express.json());

// Conseguir todos los usuarios: GET /users
app.get("/users", (req, res) => {
  res.json(users);
});

// Conseguir un usuario concreto (por ID): GET /users/:id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(element => element.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Not found");
  }
});

// Crear un nuevo usuario: POST /users
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users[users.length - 1].id + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Actualizar un usuario (por ID): UPDATE /users/:id
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send("Not found");
  }

  const index = users.findIndex(user => user.id === id);
  users[index] = {
    ...users[index], // "Ponme dentro lo que ya había...
    ...req.body // ...y luego sobreescríbelo con lo que viene en la petición"
  };

  res.json(users[index]);
});

// Eliminar usuario (por ID): DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send("Not found");
  }

  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1);
  res.send("Deleted");
});

app.listen(3000, () => {
  console.log("I'm listening at port 3000");
});