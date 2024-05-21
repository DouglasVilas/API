const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(request, response) {
        
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //e para evitar criar um email duplicado

        if (checkUserExist) {
            throw new AppError("Este e-mail já esta em uso.");
        }
       
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?), ",
            [name, email, password]
        
        );
       
       
        return response.status(201).json();

    }

}
module.exports = UsersController;