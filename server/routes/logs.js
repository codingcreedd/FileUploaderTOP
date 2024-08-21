const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();const passwordUtils = require('../lib/passwordUtils')
const passport = require('passport');
const router = require('express').Router();

//signup
router.post('/signup', async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;

        //hashpassword and salt implementations
        const hashSalt = passwordUtils.genPassword(password);
        const hashpassword = hashSalt.hash;
        const salt = hashSalt.salt;

        await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                hashpassword,
                salt
            }
        });

        res.status(201).json({message: 'User created successfuly'});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Cannot create user'});
    }
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
    console.log('Session:', req.session);
    console.log('User:', req.user);

    if (!req.session.passport || !req.session.passport.user) {
        res.status(401).json({ message: 'Login failed', authenticated: false });
    } else {
        res.status(200).json({ message: 'Login successful', user: req.session.passport.user, authenticated: true });
    }
});


router.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Handle the error if something goes wrong during logout
        }
        res.status(200).json({
            message: 'Logged out successfully'
        });

        if(req.session.passport) {
            console.log(req.session.passport);
        } else {
            console.log(req.session);
        }
    });
});

  

module.exports = router;