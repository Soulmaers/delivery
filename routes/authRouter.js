const express = require('express');
const passport = require('passport');
const router = express.Router();


router.post('/signup', (req, res, next) => {
    console.log(req)
    passport.authenticate('signup', function (err, user) {
        if (user) {
            res.json({ data: user, status: 'ok' })
        } else {
            res.json({ error: req.flash('signup-message')[0], status: 'error' });
        }

    })(req, res, next)
})

router.post('/signin', (req, res, next) => {
    console.log(req)
    passport.authenticate('login', function (err, user) {
        if (user) {
            req.logIn(user, function (err) {
                if (err) {
                    console.log(err)
                    return next(err)
                }
                req.user = user
                console.log({ data: user, status: 'ok' })
                res.json({ data: user, status: 'ok' });
            })
        } else {
            console.log(req.flash('login-message'), 'error');
            res.json({ error: req.flash('login-message')[0], status: 'error' });
        }
    })(req, res, next)
})


module.exports = router