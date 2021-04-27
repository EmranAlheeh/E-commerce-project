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



//   module.exports = (sequelize, Sequelize) => {
//     const CategoryBrand = sequelize.define("categoryBrands", {
//         CategoryID: {
//             type: Sequelize.INTEGER,
//             references: {
//               // This is a reference to another model
//               model: 'carts',
      
//               // This is the column name of the referenced model
//               key: 'CartID'
//           }
//           },
//     },{
//         timestamps: false
//       } 
//       );
// };