// Write your "actions" router here!
const express = require("express")
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')
const {validateActionsID} = require('./actions-middlware')

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

router.get('/:id',validateActionsID, (req, res) => {
    // try{
    // const project = await Actions.get(req.params.id)
    // if(!project){
    //     res.status(404).json({message:"No action with a given id"})
    // }else{
    //     res.json(project)
    // }
    // }
    // catch(err){
    // res.status(500).json({message: "Error fetching action with a given id"})
    // }  
    res.json(req.action)
})

router.post('/', async (req, res) => {
    try{
    const {project_id, description, notes } = req.body;   
    if(!project_id || !description || !notes){
        res.status(400).json({message:"project_id, notes and description are required"})
    }else{
        const checkProjectID = await Projects.get(project_id)
        if(!checkProjectID){
            res.status(404).json({message: "No project with a given project_id"})
        }else{
            const createAction = await Actions.insert(req.body)
            res.status(201).json(createAction)
        }
     }
    }
    catch(err){
        res.status(500).json({message: `Error posting project ${err.message}`})
     }
    })

    router.put('/:id', async (req, res) => {
        try{
        const { project_id, description, notes, completed } = req.body;
        const {id} = req.params
        if(!project_id || !description || !notes || completed === undefined ){
            res.status(400).json({message: "notes, description, project_id and completed are required"})
        }else{
            const checkActionID = await Actions.get(id)
            const checkProjectID = await Projects.get(project_id)
            if(!checkActionID || !checkProjectID){
                res.status(404).json({message:"no action with a given ID and project_id"})
            }else{
                    const updateAction = await Actions.update(id,{project_id, description, notes, completed})
                    res.status(201).json(updateAction)
                 }  
            }
        }
        catch(err){
            res.status(500).json({message: `Error updating project ${err.message}`})
         }
        })

        router.delete('/:id',async (req, res) => {
            try{
                const actionId = await Actions.get(req.params.id)
                if(!actionId){
                    res.status(404).json({message:"no actions with this id"})
                }else{
                  const deletedAction = await Actions.remove(actionId.id)
                  res.json({message:`you successfully deleted ${deletedAction} project`})
                }
            }catch(err){
                res.status(500).json({message: `Error deleting project ${err.message}`}) 
            }
            })


module.exports = router