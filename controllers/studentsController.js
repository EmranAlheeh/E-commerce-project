const db = require("../models");
  const Student = db.students;
exports.getAllStudents= function(req, res){

    Student.findAll()
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

    Student.findByPk(req.params.id)
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
exports.addLnameFnameGpa = function(req, res){

  // Validate request
  if (!req.body.fname || !req.body.lname || !req.body.gpa) {
    res.status(400).send({
      message: "First name, last name, and GPA can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const student = {
    fname: req.body.fname,
    lname: req.body.lname,
    gpa: req.body.gpa,
    status: req.body.status ? req.body.status : false, 
  };

  // Save Tutorial in the database
  Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    });
  }
  exports.updateStudentInfo =  function(req, res){

    const id = req.params.id;
  
    Student.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
    }
    exports.deleteStudent = function(req, res){

      const id = req.params.id;
    
      Student.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Student was deleted successfully."
            });
          } else {
            res.send({
              message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error deleting Student with id=" + id
          });
        });
      }
      exports.deleteStudents = function(req, res){

        Student.destroy({
          where: { },
          truncate: false
        })
          .then(num => {
              res.send({
                message: `${num} Students were deleted successfully!` 
              });
          
          })
          .catch(err => {
            res.status(500).send({
              message: "Error deleting Students"
            });
          });
        }      
        exports.getRegisteredStudents = function(){
          Student.findAll({
            where:{
              status:1
            }
          })
          .then(data => {
            res.send({
              data:data,
              'message':"registeration Student successfuly",
              // 'status':200

            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          })
        }