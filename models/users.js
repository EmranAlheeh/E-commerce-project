module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      Username: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      }, 
      lastName: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.STRING
      },
      BirthDate: {
        type: Sequelize.STRING
      }
    },{
      timestamps: false
    } );
  
    return User;
  };