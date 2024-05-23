const {hash} = require ("bcryptjs")  //importando bibliotecas para o projeto
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(request, response) {
        
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //e para evitar criar um email duplicado
        const checkUserExistName = await database.get("SELECT * FROM users WHERE name = (?)", [name])
        
        if (checkUserExist) { 
            throw new AppError("Este e-mail já esta em uso.");
        }
        
        if (checkUserExistName) { 
            throw new AppError("Este nome já esta em uso.");
        }
        
        const hashedPassword = await hash(password, 8); // tem ser assíncrona por tem que esperar fazer a criptografia 

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?) ",
            [name, email, hashedPassword]
        
        );
       
       
        return response.status(201).json();

    }

}
module.exports = UsersController;