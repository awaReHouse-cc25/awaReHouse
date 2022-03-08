
exports.up = function(knex) {
    return knex.schema.createTable("extra", table =>{
        table.string("retrieval_date");
        table.timestamps(true);
        })
};


exports.down = function(knex) {
    return knex.schema.dropTable("extra")
  
};