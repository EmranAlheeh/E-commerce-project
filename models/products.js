module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    ProductID: {
      type: Sequelize.INTEGER,
       
       
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
     
    ProductName: {
      type: Sequelize.STRING
    },
    ProductType: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    } 
  },{
    timestamps: false
  } );

  return Product;
};