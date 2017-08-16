
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('Heroes', function(table) {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Heroes');
};
