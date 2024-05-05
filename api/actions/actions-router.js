// Write your "actions" router here!
const express = require("express")
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
    const projects = await Actions.get()
    if(projects.length === 0){
        res.status(200).json([])
    }else{
        res.json(projects)
    }
    }
    catch(err){
    res.status(500).json({message: "Error fetching actions"})
    }  
})

router.get('/:id', async (req, res) => {
    try{
    const project = await Actions.get(req.params.id)
    if(!project){
        res.status(404).json({message:"No action with a given id"})
    }else{
        res.json(project)
    }
    }
    catch(err){
    res.status(500).json({message: "Error fetching action with a given id"})
    }  
})



module.exports = router