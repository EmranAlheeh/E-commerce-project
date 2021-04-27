module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brands", {
       BrandName: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      BrandImage: {
        type: Sequelize.STRING,
      }
      ,
       },{
        timestamps: false,
        tableName:"brands"
      }

      );
     
    return Brand;
  };