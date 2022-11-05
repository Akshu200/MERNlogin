const { Router } = require('express')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

require('../db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send(`Hello akshay, this is HOME page from router `)
})

// regisrter
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'plz fill the deatils' })
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: 'Email already exist' })
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: 'password is not matching' })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save()
            return res.status(201).json({ message: 'user register Successfully' })
        }

    }
    catch (err) {
        console.log(err)
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json('plz fill details')
        }

        const userLogin = await User.findOne({ email: email })

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (!isMatch) {
                return res.status(400).json({ error: 'invalid Credientials' })
            }
            else {
                return res.status(200).json({ message: 'user login successfully' })
            }
        } else {
            return res.status(400).json({ error: 'invalid Credientials' })
        }



    } catch (error) {
        console.log(error)
    }

})

module.exports = router;