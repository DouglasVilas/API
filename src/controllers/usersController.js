const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class UsersController {
    create(request, response) {
        
        const { name, email, password } = request.body;

        if (!name) {
            throw new AppError("Nome é obrigatório!");
        }


        response.status(201).json({ name, email, password });

    }
}
module.exports = UsersController;