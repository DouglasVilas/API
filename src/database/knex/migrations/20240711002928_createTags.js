
exports.up = knex => knex.schema.createTable("tags", table => {      
    table.increments("id");
    table.text("name").notNullable;

    
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//DELETA UMA NOTA AO TODO ATÉ AS TAGS
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("tags"); //deletar tables 
  

