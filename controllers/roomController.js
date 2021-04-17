const db = require("../models");
  const Room = db.room;
  const Op = db.Sequelize.Op;
exports.searchRooms= function(req, res){
    const roomId = req.query.roomId;
    var condition = roomId ? { roomId: { [Op.like]: `%${roomId}%` } } : null
  
    Room.findAll({
        where:condition
      
        }
      )
      .then(data => {
        res.send({
            
            'data':data,
            'message':"Rooms resived successfully",
            'status':200
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
    }
     
    exports.getAllStudents= function(req, res){

      Room.findAll()
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
  
      Room.findByPk(req.params.id)
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
     
  
 