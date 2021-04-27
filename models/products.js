module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    ProductID: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
       
      primaryKey: true
    }, CategoryID: {
      type: Sequelize.INTEGER,
       
      references: {
        // This is a reference to another model
        model: 'categories',

        // This is the column name of the referenced model
        key: 'CategoryID'
    }
    }, 
    CartID: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: 'carts',

        // This is the column name of the referenced model
        key: 'CartID'
    }
    },
    ProductName: {
      type: Sequelize.STRING
    },
    ProductType: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    },
    Price: {
      type: Sequelize.DOUBLE
    },
    Size: {
      type: Sequelize.STRING
    },
    Color: {
      type: Sequelize.STRING
    },
    Quantity: {
      type: Sequelize.INTEGER
    },
  },{
    timestamps: false
  } );

  return Product;
};