module.exports.model = function(db){
    var schema =  db.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    });

   module.exports = db.model('user_accounts', schema);
};