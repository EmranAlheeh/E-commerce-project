module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      OrderID: {
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
      },UserID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'users',

          // This is the column name of the referenced model
          key: 'UserID'
      }
      },CartID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'carts',

          // This is the column name of the referenced model
          key: 'CartID'
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