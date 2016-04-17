var users = require('../models/user.js');

module.exports.controller = function(app, db){
  app.post('/api/createAccount', function(req, res){
      var user = new users.schema({
          email: req.body.email,
          password: req.body.password
      });
      user.save(function(err){
          if(!err){
              res.sendStatus(200);
          }
      });
  });
};

//app.route('/book')
//    .get(function(req, res) {
//        res.send('Get a random book');
//    })
//    .post(function(req, res) {
//        res.send('Add a book');
//    })
//    .put(function(req, res) {
//        res.send('Update the book');
//    });