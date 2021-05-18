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
    BrandName: {
      type: Sequelize.STRING,
       
      references: {
        // This is a reference to another model
        model: 'brands',

        // This is the column name of the referenced model
        key: 'BrandName'
    }
    }, 
    ProductName: {
      type: Sequelize.STRING
    },
    ProductType: {
      type: Sequelize.STRING
    },
    Price: {
      type: Sequelize.DOUBLE
    } ,
    Discount: {
      type: Sequelize.DOUBLE
    } ,TotalPrice: {
      type: Sequelize.DOUBLE
    } 
  },{
    timestamps: false
  } );

  return Product;
};