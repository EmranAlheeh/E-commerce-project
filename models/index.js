require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.carts = require("./carts.js")(sequelize, Sequelize); 
db.comments = require("./comments.js")(sequelize, Sequelize); 
db.members = require("./members.js")(sequelize, Sequelize); 
db.products = require("./products.js")(sequelize, Sequelize); 
db.ratings = require("./ratings.js")(sequelize, Sequelize); 
db.transactions = require("./transactions.js")(sequelize, Sequelize); 

db.carts.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasMany(db.carts, { foreignKey: 'ProductID' });
db.comments.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasMany(db.comments, { foreignKey: 'ProductID' });
db.ratings.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasMany(db.ratings, { foreignKey: 'ProductID' });
db.transactions.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasMany(db.transactions, { foreignKey: 'ProductID' });

db.carts.belongsTo(db.products, { foreignKey: 'MemberID' });
db.products.hasMany(db.carts, { foreignKey: 'MemberID' });
db.comments.belongsTo(db.products, { foreignKey: 'MemberID' });
db.products.hasMany(db.comments, { foreignKey: 'MemberID' });
db.ratings.belongsTo(db.products, { foreignKey: 'MemberID' });
db.products.hasMany(db.ratings, { foreignKey: 'MemberID' });
db.transactions.belongsTo(db.products, { foreignKey: 'MemberID' });
db.products.hasMany(db.transactions, { foreignKey: 'MemberID' });

module.exports = db;
 