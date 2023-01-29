var express = require("express");
var usersRouter = express.Router();
const {users, addUserToDb} = require("../db");

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
  return res.json(users);
});

/* Get a specific user */
usersRouter.get('/:id', function (req, res, next) {
    let id = req.params.id;
    let user = users.find(user => user.id == id);
    if (user) {
        return res.json(user);
    }
    return res.status(404).json('user not found');
});

usersRouter.post('/', function (req, res, next) {
    let content = req.body;
    const user = addUserToDb({
        name: content.name,
        email: content.email,
        password: content.password,
        birthday: content.birthday,
        gender: content.gender,
        phone: content.phone
    });
    if (user) {
        return res.json(user);
    } else {
        return res.status(500).send('Error adding user to database, this email is already in use');
    }
});

module.exports = usersRouter;