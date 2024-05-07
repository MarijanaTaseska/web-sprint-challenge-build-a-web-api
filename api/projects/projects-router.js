// Write your "projects" router here!
const express = require("express")
const Projects = require('./projects-model')
const {validateProjectId} = require('./projects-middleware')
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

router.get('/:id', validateProjectId,(req, res) => {
    console.log(req.project)
    res.json(req.project)
    // try{
    // const project = await Projects.get(req.params.id)
    // if(!project){
    //     res.status(404).json({message:"No project with a given id"})
    // }else{
    //     res.json(project)
    // }
    // }
    // catch(err){
    // res.status(500).json({message: "Error fetching project"})
    // }  
})

router.post('/', async (req, res) => {
try{
const {name, description} = req.body;
if(!name || !description){
    res.status(400).json({message:" name and description are required"})
}else{
    const createProject = await Projects.insert(req.body)
    res.status(201).json(createProject)
 }
}
catch(err){
    res.status(500).json({message: `Error posting project ${err.message}`})
}
})

router.put('/:id',validateProjectId, async (req, res) => {
try{
const { id } = req.params
const {name, description, completed} = req.body
if(!name || !description || completed === undefined){
    res.status(400).json({message: "Must provide name, completed and description to update"})
}else{
    const project = await Projects.get(id)
    if(!project){
        res.status(404).json({message:"no projects with this id"})
    }else{
     const updateProject = await Projects.update(id,{name, description, completed})
     res.status(200).json(updateProject)
    }
 }
 }
catch(err){
    res.status(500).json({message: `Error updating project ${err.message}`}) 
}
})

router.delete('/:id',validateProjectId, async (req, res) => {
try{
    // const projectID = await Projects.get(req.params.id)
    // if(!projectID){
    //     res.status(404).json({message:"no project with this id"})
    // }else{
      const deletedProject = await Projects.remove(req.params.id)
      res.json({message:`you successfully deleted ${deletedProject} project`})
   // }
}catch(err){
    res.status(500).json({message: `Error deleting project ${err.message}`}) 
}
})

router.get('/:id/actions',validateProjectId, async (req, res) => {
    try{
    //     const projectID = await Projects.get(req.params.id)
    // if(!projectID){
    //     res.status(404).json({message:"no project with this id"})
    // }else{
        const projectActions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(projectActions)
    //}
 }
    catch(err){
        res.status(500).json({message: `Error retrieving project actions ${err.message}`})
    }
})

module.exports = router