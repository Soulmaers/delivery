const UserModule = require('../module/UserModule.js');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

const userModule = new UserModule();

const signin = function (passport) {
    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async function (req, email, password, done) {
                const user = await userModule.findByEmail(email).catch((err) => {
                    console.log(err);
                    return done(err);
                });

                if (!user) {
                    console.log('Пользователь с таким именем не найден');
                    return done(
                        null,
                        false,
                        req.flash('login-message', 'Пользователь с таким именем не найден')
                    );
                }

                console.log(`isValidPassword`);

                if (!isValidPassword(user, password)) {
                    console.log('Неверный пароль');
                    return done(
                        null,
                        false,
                        req.flash('login-message', 'Неверный пароль')
                    );
                }

                console.log(`signin ${user}`);
                return done(null, user);
            }
        )
    );

    const isValidPassword = function (user, password) {
        return bcrypt.compareSync(password, user.passwordHash);
    };
};


module.exports = signin