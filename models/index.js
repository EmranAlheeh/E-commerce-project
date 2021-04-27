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
db.brands = require("./brands.js")(sequelize, Sequelize); 
db.carts = require("./carts.js")(sequelize, Sequelize); 
db.categories = require("./categories.js")(sequelize, Sequelize); 
db.image = require("./image.js")(sequelize, Sequelize); 
db.orders = require("./orders.js")(sequelize, Sequelize); 
db.ordersDetails = require("./ordersDetails.js")(sequelize, Sequelize); 
db.products = require("./products.js")(sequelize, Sequelize); 
db.sales = require("./sales.js")(sequelize, Sequelize); 
db.userAddress = require("./userAddress.js")(sequelize, Sequelize); 
db.users = require("./users.js")(sequelize, Sequelize); 


 

 
db.products.belongsTo(db.carts, { foreignKey: 'CartID' });
db.carts.hasMany(db.products, { foreignKey: 'CartID' });

db.orders.belongsTo(db.carts, { foreignKey: 'CartID' });
db.carts.hasMany(db.orders, { foreignKey: 'CartID' });

db.carts.belongsTo(db.users, { foreignKey: 'UserID' });
db.users.hasMany(db.carts, { foreignKey: 'UserID' });

db.orders.belongsTo(db.users, { foreignKey: 'UserID' });
db.users.hasMany(db.orders, { foreignKey: 'UserID' });

db.userAddress.belongsTo(db.users, { foreignKey: 'UserID' });
db.users.hasMany(db.userAddress, { foreignKey: 'UserID' });




 
db.products.belongsTo(db.categories, { foreignKey: 'CategoryID' });
db.categories.hasMany(db.products, { foreignKey: 'CategoryID' });

db.ordersDetails.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasOne(db.ordersDetails, { foreignKey: 'ProductID' });

db.sales.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasOne(db.sales, { foreignKey: 'ProductID' });

 

db.ordersDetails.belongsTo(db.sales, { foreignKey: 'SalesID' });
db.sales.hasOne(db.ordersDetails, { foreignKey: 'SalesID' });

db.ordersDetails.belongsTo(db.orders, { foreignKey: 'OrderID' });
db.orders.hasOne(db.ordersDetails, { foreignKey: 'OrderID' });

db.image.belongsTo(db.products, { foreignKey: 'ProductID' });
db.products.hasMany(db.image, { foreignKey: 'ProductID' });



db.brands.belongsToMany(db.categories,{through :  'categoryBrands',foreignKey:'BrandName'});
db.categories.belongsToMany(db.brands,{through :  'categoryBrands',foreignKey:'CategoryID'});

  

module.exports = db;
 