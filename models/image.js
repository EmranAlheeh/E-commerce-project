module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
      ImageID: {
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
      ImageSource: {
        type: Sequelize.STRING,
      },
      subImagesSource: {
        type: Sequelize.STRING,
      },
    },{
        timestamps: false
      } 

      );
     
    return Image;
  };