/**
 * User.js
 *
 * @description :: The user model.
 * @docs        ::
 */

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
  customToJSON: function() {
    return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb){
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};
