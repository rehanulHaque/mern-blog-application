const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const auth = require('../middleware/auth')


router.post('/signup', async(req, res)=>{
    try {
        const user = await User.signup(req.body.email, req.body.password)
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        res.status(200).send({token})
    } catch (error) {
        res.status(400).send({error: error.message})
        console.log(error.message)
    }
})

// GET All blog route
router.post('/login', async(req, res)=>{
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        res.status(200).send({token})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/me',auth, async(req, res)=>{
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router