module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("userAddress", {
      AddressID: {
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
      City: {
        type: Sequelize.STRING
      },
      Region: {
        type: Sequelize.STRING
      },
      Street: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.STRING
      }
    },{
      timestamps: false
    } );
  
    return Address;
  };