/**
 * @file See what happens when a database is spammed with nonsense
 * Created Oct 20 2017
 */

var mysql = require('mysql');
var Sequelize = require('sequelize');
var faker = require('faker');

let dbOptions = {
  dialect: 'mysql',
  logging: false
};

db = new Sequelize('largeTest', 'root', '', dbOptions);

const users = db.define('users', {
  username: Sequelize.STRING,
  location: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE},
  { indexes: [ { name: 'location_index', method: 'BTREE', fields: [ 'location', { attribute: 'username', order: 'DESC' } ] } ] }
);

//The indexing improved query time from 0.50s to 0.03s

// exports.users = users;
let makeNewUser = (n) => {
  console.log('Add user', n);
  users.create({
    username: faker.name.findName(),
    location: faker.address.country()
  }).then(() => {
    if (n > 0) {
      makeNewUser(n - 1);
    }
  });
};

users.sync().then(() => {
  makeNewUser(1000000);
});
