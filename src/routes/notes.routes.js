const { Router } = require("express");
const NotesController = require("../controllers/NotesController");


const notesRoutes = Router();


const notesController = new NotesController(); //criando um nova estancia de uma classe  


notesRoutes.post("/:user_id", notesController.create);


module.exports = notesRoutes;