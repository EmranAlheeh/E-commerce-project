module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define("sales", {
      SalesID: {
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
      PriceBeforeSale:{
        type: Sequelize.DOUBLE
      },
      Discount:{
        type: Sequelize.DOUBLE
    },

    },{
        timestamps: false
      } 

      );
     
    return Sale;
  };