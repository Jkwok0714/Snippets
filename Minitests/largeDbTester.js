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
  updatedAt: Sequelize.DATE
});

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
