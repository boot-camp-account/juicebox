const express = require('express');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  //request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      //create token and return to user
      res.send({ message: "You're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username of Password is incorrect"
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

const { getAllUsers, getUserByUsername, createUser } = require('../db');

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    });
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({
      username,
      password,
      name,
      location,
    });

    const token = jwt.sign({ 
      id: user.id, 
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message })
  } 
});

const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 1, username: "albert" }, process.env.JWT_SECRET);

token;

module.exports = usersRouter;