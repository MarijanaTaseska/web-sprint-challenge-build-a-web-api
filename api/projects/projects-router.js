// Write your "projects" router here!
const express = require("express")
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message:"Hello from insite the ROUTER"})
})


module.exports = router