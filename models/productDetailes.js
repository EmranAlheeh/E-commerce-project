module.exports = (sequelize, Sequelize) => {
    const ProductDetailes = sequelize.define("prouductDetailes", {
      DetailesID: {
        type: Sequelize.INTEGER,
         
         
        primaryKey: true
      },
      ProductID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'products',

          // This is the column name of the referenced model
          key: 'ProductID'
      }
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
  
    return ProductDetailes;
  };