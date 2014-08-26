var passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy, 
    GitHubStrategy = require('passport-github').Strategy;


function findById(id, cb) {
  User.findOne(id).exec(function (err, user) {
    return cb(err, user);
  });
}
 
function findByUsername(u, cb) {
  User.findOne({username: u}).exec(function (err, user) {
    return cb(err, user);
  });
}    
function findByEmail(e, cb) {
  User.findOne({email: e}).exec(function (err, user) {
    return cb(err, user);
  });
}    

function verifyPassword(user, password, cb) {
    return (user.verifyPassword(password)) 
        ? cb(null, user, {message: 'Ok'})
        : cb(null, null, {message: 'Invalid Password'});
}

var verifyHandlerLocal = function (username, password, cb) {
    process.nextTick(function () {
      findByUsername(username, function (err, user) {
        if (err) return cb(null, err);
        if (user == undefined) {
            findByEmail(username, function(err, user) {
                if (err) return cb(null, err);
                if (user == undefined) {
                    return cb(null, false, {message: 'Unknown credentials'});
                }
                return verifyPassword(user, password, cb);
            }); 
        }
        else 
            return verifyPassword(user, password, cb);
        
      })
    });
}

var verifyHandler = function (token, tokenSecret, profile, cb) {
    process.nextTick(function () {
        var provider = profile.provider;
        if (profile.emails !== undefined 
            && profile.emails[0] !== undefined
            && profile.emails[0].value !== undefined) {

            findByEmail(profile.emails[0].value, function(err, user){
                if (err) return cb(err);
                if (user !== undefined) {
                    return cb(err,user);
                }
                else {
                    var data = {"name": profile.displayName,
                                "username": profile.id,
                                "email": profile.emails[0].value,
                                "password": profile.id};                    
                    User.create(data, function(err, newUser) {
                        if (err) return cb(err);
                        return cb(null, newUser);
                    });
                }
            });
        }
        else {
            return cb('No email provided', null);
        }
    });
};

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    findById(id, function(err, user){
        return cb(err, user);
    });
});

passport.use(new GitHubStrategy(sails.config.passport.github, verifyHandler));
passport.use(new LocalStrategy(verifyHandlerLocal));