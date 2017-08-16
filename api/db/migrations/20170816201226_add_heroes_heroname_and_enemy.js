
exports.up = function(knex, Promise) {
  return knex.schema.table('Heroes', function(table) {
    table.string('heroName');
    table.integer('enemyId').references('id').inTable('Heroes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Heroes', function(table) {
    table.dropColumn('enemyId');
    table.dropColumn('heroName');
  });
};
