const { Router } = require("express");
const TagsController = require("../controllers/TagsController");


const tagsRoutes = Router();


const tagsController = new TagsController(); //criando um nova estancia de uma classe  

tagsRoutes.get("/:user_id", tagsController.index);




module.exports = tagsRoutes;