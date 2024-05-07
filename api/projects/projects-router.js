// Write your "projects" router here!
const express = require("express")
const Projects = require('./projects-model')
const { validateProjectId, validateProjectBody } = require('./projects-middleware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        if (projects.length === 0) {
            res.status(200).json([])
        } else {
            res.json(projects)
        }
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProjectBody, async (req, res, next) => {
    try {
        const createProject = await Projects.insert(req.body)
        res.status(201).json(createProject)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, description, completed } = req.body
        if (!name || !description || completed === undefined) {
            res.status(400).json({ message: "Must provide name, completed and description to update" })
        } else {
            const updateProject = await Projects.update(id, { name, description, completed })
            res.status(200).json(updateProject)
        }
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const deletedProject = await Projects.remove(req.params.id)
        res.json({ message: `you successfully deleted ${deletedProject} project` })
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const projectActions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(projectActions)
    }
    catch (err) {
        next(err)
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'Error inside projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router