const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passwordUtils = require('../lib/passwordUtils')

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
})

module.exports = router;