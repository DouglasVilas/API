const { Router } = require("express");
const  UsersController = require("../controllers/usersController");


const usersRoutes = Router();


const usersController = new UsersController(); //criando um nova estancia de uma classe  


usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;