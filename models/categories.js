module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
      CategoryID: {
        type: Sequelize.INTEGER,
         
        primaryKey: true
      },
       

      CategoryType: {
        type: Sequelize.STRING,
      },

      CategoryName: {
        type: Sequelize.STRING,
      },
    },{
        timestamps: false
      } 

      );
     
    return Category;
  };



 