const router = require('express').Router()
const Blog = require('../models/blogModel')
const auth = require('../middleware/auth')

router.use(auth)

router.post('/create', async(req, res)=>{
    try {
        if(!req.body.title){
            throw Error('Title is Required')
        }
        if(!req.body.description){
            throw Error('Description is Required')
        }
        const body = {title: req.body.title, description: req.body.description, user: req.user._id}
        const blog = await Blog.create(body)
        res.status(200).send(blog)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

// GET All blog route
router.get('/all', async(req, res)=>{
    try {
        const allBlog = await Blog.find({})
        res.status(200).send(allBlog)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

// GET Single blog route
router.get('/:id',async(req, res)=>{
    try {
        const blog = await Blog.findOne({_id: req.params.id})
        res.status(200).send(blog)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

// DELETE blog route
router.delete('/:id', async(req, res)=>{
    try {
        const blog = await Blog.findOneAndDelete({_id: req.params.id, user: req.user._id})
        res.status(200).send({delete: 'Deleted Blog'})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

// // UPDATE blog route
// router.patch('/:id',auth, async(req, res)=>{
//     try {
//         const blog = await Blog.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {$set: req.body}, {new: true})
//         res.send(blog)
//     } catch (error) {
//         res.send(error.message)
//         console.log(error)
//     }
// })

module.exports = router