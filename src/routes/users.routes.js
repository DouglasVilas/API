const { Router } = require("express");
const  UsersController = require("../controllers/usersController");



const usersRoutes = Router();

function myMiddleware(request, response, next) {
    console.log("Você passou pelo Middleware!")
    
    if (!request.body.isAdmin) {
        return response.json({ message: "user unauthorized" });
    }
    
    next();
}


const usersController = new UsersController(); //criando um nova estancia de uma classe  


usersRoutes.post("/",myMiddleware, usersController.create);



module.exports = usersRoutes;