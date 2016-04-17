module.exports.model = function(db){
    var schema =  new db.Schema({
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

   module.exports.schema = db.model('user_accounts', schema);
};