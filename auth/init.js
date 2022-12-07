const UserModule = require('../module/UserModule.js');
const signin = require('./signin.js');
const signup = require('./signup.js');

const userModule = new UserModule();

const initAuth = function (passport) {
    //console.log('initAuth');
    passport.serializeUser(function (user, done) {
        console.log('serialize');
        console.log(`serializing user: ${user}`);
        console.log(null, user._id);
        done(null, user._id);
    });

    passport.deserializeUser(async function (id, done) {
        console.log('deserialize');

        await userModule
            .findById(id)
            .then((user) => {
                console.log(`deserializing user: ${user}`);
                done(false, user);
            })
            .catch((err) => {
                console.log(err);
                done(err, null);
                return;
            });
    });

    signin(passport);
    signup(passport);
};


module.exports = initAuth