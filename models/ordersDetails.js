module.exports = (sequelize, Sequelize) => {
    const Details = sequelize.define("ordersDetails", {
      OrderDeID:{
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      DetailesID: {
        type: Sequelize.INTEGER,

        references: {
          // This is a reference to another model
          model: 'prouductDetailes',

          // This is the column name of the referenced model
          key: 'DetailesID'
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