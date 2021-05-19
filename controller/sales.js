const db = require("../models");
const calculate = require("basic-calculator-js")
const Op = db.Sequelize.Op;
const Pro = db.products;
      
const createpro = function(req, res){ //create new product

  // Validate request
  if (!req.body.ProductID || !req.body.CategoryID || !req.body.BrandName
    || !req.body.ProductName|| !req.body.ProductType|| !req.body.Price) {
    res.status(400).send({
      message: "some data can not be empty!"
    });
    return;
  }
  const total = (req.body.Price - (req.body.Discount*req.body.Price));
  // Create a Tutorial
  const pro = {
    ProductID: req.body.ProductID,
    CategoryID: req.body.CategoryID,
    BrandName: req.body.BrandName,
    ProductName: req.body.ProductName,
    ProductType: req.body.ProductType,
    Price: req.body.Price,
    Discount: req.body.Discount,
    TotalPrice:total,
  };

  // Save Tutorial in the database
  Pro.create(pro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    });
   
}
    const withoutDISCOUNT = function(req, res){ //find(get) products that do not have discount 

        Pro.findAll({where: {Discount:0}})
          .then(data => {
            res.send({
              'data':data,
              'message':"these are products without dicount",
              'status': 200
            }
      );
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving sales."
            });
          });
         
      }
      const SearchforSales = function(req, res){ //find products that have the same discount
      const Discount = req.params.Discount
          Pro.findAll({
            where:{Discount:Discount}
            })
        
          .then(data => {
            res.send({
              'data':data,
              'message':"these are products that have the same discount ",
              'status': 200
            });
      
            })
            
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
          }
          const createSale = function(req, res){ //create discount! 
       
            const id = req.params.id;
            const total = (req.body.Price - (req.body.Discount*req.body.Price));
            Pro.update(req.body,  {
              where: { ProductID: id }  
            })
              .then(num => {
                if (num == 1) {
                  res.send({

                    TotalPrice:total,
                    message: "Sale was created successfully."
                  });
                } else {
                  res.send({
                    message: `Cannot create Sale with ${id}. Maybe no product has this id or req.body is empty!`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error creating sale with id=" + id
                });
              });
             
          }
          const deleteSale = function(req, res){ //delete discount! 

            const id = req.params.id;
            Pro.update( 
              {Discount:0}, {
       
                where: { ProductID: id},
               
             }
            )
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: "Sale was deleted successfully."
                  });
                } else {
                  res.send({
                    message: `Cannot delete Sale with ${id}. Maybe no product has this id or req.body is empty!`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error deleting sale with id=" + id
                });
              });
             
          }

         
      module.exports = {
                        withoutDISCOUNT:withoutDISCOUNT,                   
                        createSale:createSale,                        
                        SearchforSales:SearchforSales,
                        deleteSale:deleteSale,
                        createpro:createpro
                      };  