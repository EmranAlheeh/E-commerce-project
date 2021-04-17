module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {
      CartID: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      MemberID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'members',

          // This is the column name of the referenced model
          key: 'MemberID'
      }
      },
      ProductID: {
        type: Sequelize.UUID,
        references: {
          // This is a reference to another model
          model: 'products',

          // This is the column name of the referenced model
          key: 'ProductID'
      }
       
      },
      Quantity: {
        type: Sequelize.UUID,
      },},{
        timestamps: false
      } 

      );
     
    return Cart;
  };