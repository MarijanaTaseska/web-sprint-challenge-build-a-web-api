// Write your "projects" router here!
const express = require("express")
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
    const projects = await Projects.get()
    if(projects.length === 0){
        res.status(200).json([])
    }else{
        res.json(projects)
    }
    }
    catch(err){
    res.status(500).json({message: "Error fetching projects"})
    }  
})

router.get('/:id', async (req, res) => {
    try{
    const project = await Projects.get(req.params.id)
    if(!project){
        res.status(404).json({message:"No project with a given id"})
    }else{
        res.json(project)
    }
    }
    catch(err){
    res.status(500).json({message: "Error fetching project"})
    }  
})

router.post('/', async (req, res) => {
try{

}
catch(err){
    res.status(500).json({message: "Error posting project"})
}
})

module.exports = router