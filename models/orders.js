module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      OrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'users',

          // This is the column name of the referenced model
          key: 'UserID'
      }
      },
      
      
      TotalPrice: {
        type: Sequelize.DOUBLE,       
      },

      Quantity: {
        type: Sequelize.INTEGER,
      },

      OrderDate: {
        type: Sequelize.DATE,
      },
    },{
        timestamps: false
      } 

      );
     
    return Order;
  };