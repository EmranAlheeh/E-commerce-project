module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {
      CartID: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },UserID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'users',

          // This is the column name of the referenced model
          key: 'UserID'
      }
      },
    
       
      SubTotal: {
        type: Sequelize.DOUBLE,       
      },

      ShippingPrice: {
        type: Sequelize.DOUBLE,
      },

      TotalPrice: {
        type: Sequelize.DOUBLE,
      },
    },{
        timestamps: false
      } 

      );
     
    return Cart;
  };