const db = require('../models');
const Brand = db.brands;
const Category= db.categories;
exports.addBrand= function(req,res){
      // Validate request
      if (!req.body.BrandName || !req.body.BrandImage  ) {
        res.status(400).send({
          message: " BrandName and BrandImage can not be empty!"
        });
        return;
      }
    
      // Create a Tutorial
      const brands = {
        BrandName: req.body.BrandName,
        BrandImage: req.body.BrandImage,
         
        status: req.body.status ? req.body.status : false, 
      };
    
      // Save Tutorial in the database
      Brand.create(brands)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Student."
          });
        });
};
exports.getAllbrand= function(req, res){

  Brand.findAll()
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

  Brand.findByPk(req.params.id)
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
exports.updateBrandInfo =  function(req, res) {

  const BrandName = req.params.BrandName;
   
  Brand.update(req.body, {
    where: { BrandName: BrandName }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Brand was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Brand with id=${BrandName}. Maybe Brand was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Brand with id=" + BrandName
      });
    });
  }
  exports.deleteBrand = function(req, res){

    const BrandName = req.params.BrandName;
  
    Brand.destroy({
      where: { BrandName: BrandName }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Brand was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Brand with BrandName=${BrandName}. Maybe Brand was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Brand with BrandName=" + BrandName
        });
      });
    }