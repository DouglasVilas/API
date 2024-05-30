const {hash, compare} = require ("bcryptjs")  //importando bibliotecas para o projeto
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(request, response) {
        
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
       
        const checkUserExistName = await database.get("SELECT * FROM users WHERE name = (?)", [name])
        
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

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;
    
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
        
        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //e para evitar criar um email duplicado
    
        if (userWithUpdateEmail && userWithUpdateEmail.id !==  user.id) { 
           throw new AppError("Este e-mail já esta em uso.");
        }
        
        //validando caso o usuario so altera a senha 
        user.name = name ?? user.name;
        user.email = email ?? user.email;

       //para conferir se o usuario sabe a senha antiga 
        if ( password && !old_password ) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha ");
        
        }
        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            const checkpassword = await compare(password, user.password);

            if (checkOldPassword === checkpassword) {
                throw new AppError("Náo pode ser inserido a mesma senha!");
            }
        
            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }
            user.password = await hash(password, 8);
        }

        //caso o usuario digite a mesma senha
       

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
    
        );

        return response.status(200).json();
    }   
}
module.exports = UsersController;
