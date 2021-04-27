module.exports = (sequelize, Sequelize) => {
    const Details = sequelize.define("ordersDetails", {
      ProductID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'products',

          // This is the column name of the referenced model
          key: 'ProductID'
      }
      },SalesID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'sales',

          // This is the column name of the referenced model
          key: 'SalesID'
      }
      }
    },
    {
      timestamps: false
        
       }
      );
     
    return Details;
  };