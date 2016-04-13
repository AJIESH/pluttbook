module.exports.controller = function(app, db){
  app.post('/api/createAccount', function(req, res){
      var collection = db.get('user_accounts');
      collection.insert({
         "email" : req.email,
         "password" : req.password
      }, function(err, doc){
          if(err){
              res.sendStatus(401);
          }
          else{
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