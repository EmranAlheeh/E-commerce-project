module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      ProductID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      ProductName: {
        type: Sequelize.STRING
      },
      ProductType: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      Stock: {
        type: Sequelize.INTEGER
      },
      Price: {
        type: Sequelize.INTEGER
      },
      ImageSource: {
        type: Sequelize.STRING
      }
    },{
      timestamps: false
    } );
  
    return Product;
  };