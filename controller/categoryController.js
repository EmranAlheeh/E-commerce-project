const db = require('../models');
const Category = db.categories;
const Product = db.products;
const Brand = db.brands;
const BrandCategory = db.categoryBrands;
exports.addCategory= function(req,res){
    // Validate request
    if (!req.body.CategoryID || !req.body.CategoryType || !req.body.CategoryName) {
        res.status(400).send({
          message: "category ID, type, and name can not be empty!"
        });
        return;
      }
    
      // Create a Tutorial
      const category = {
        CategoryID: req.body.CategoryID,
        CategoryType: req.body.CategoryType,
        CategoryName: req.body.CategoryName,
        status: req.body.status ? req.body.status : false, 
      };
    
      // Save Tutorial in the database
      Category.create(category)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Category."
          });
        });
}
exports.getAllCategory= function(req, res){
  const CategoryId = db.categories.CategoryID;
  Category.findAll({
    // include:[
    //   where: { CategoryId:CategoryId},
    //   module: Brand,
    //   through:{attributes: []}
    // ]
      
  })

    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    })};
exports.findById= function(req, res){

  Category.findByPk(req.params.id)
    .then(data => {
      res.send({
        data : data ,
        msg:"This is the find by pk"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    });
   
};
exports.updateCategoryInfo =  function(req, res) {

  const CategoryID = req.params.CategoryID;
   
  Category.update(req.body, {
    where: { CategoryID: CategoryID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${CategoryID}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + CategoryID
      });
    });
  }
  exports.deleteCategory = function(req, res){

    const CategoryID = req.params.CategoryID;
  
    Category.destroy({
      where: { CategoryID: CategoryID }
    }),
    Product.destroy({
      where: { CategoryID: CategoryID }
    })
    
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Category with CategoryID=${CategoryID}. Maybe Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Category with CategoryID=" + CategoryID
        });
      });
    }
     

  exports.addCategoryBrand= function(req, res){
    let category;
    let brand;
     Category.findByPk(req.body.CategoryID)
      .then(data => {
         category = data
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      });
      Brand.findByPk(req.body.BrandName)
      .then(data => {
         brand = data
         category.addBrand(brand,{
           through:{
             selfGranted:false
           }
         })
         res.json({
           status:"succesfull add"
         })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      });
      
  };
  exports.updateCategoryInfo =  function(req, res) {
  
    const CategoryID = req.params.CategoryID;
     
    Category.update(req.body, {
      where: { CategoryID: CategoryID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${CategoryID}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + CategoryID
        });
      });
    }