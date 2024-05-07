// Write your "actions" router here!
const express = require("express")
const Actions = require('./actions-model')
const { validateActionsID, validateActionBody, checkProject_id } = require('./actions-middlware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        if (actions.length === 0) {
            res.status(200).json([])
        } else {
            res.json(actions)
        }
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', validateActionsID, (req, res) => {
    res.json(req.action)
})

router.post('/', validateActionBody, checkProject_id, async (req, res, next) => {
    try {
        const createAction = await Actions.insert(req.body)
        res.status(201).json(createAction)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionsID, checkProject_id, async (req, res, next) => {
    try {
        const { project_id, description, notes, completed } = req.body;
        if (!project_id || !description || !notes || completed === undefined) {
            res.status(400).json({ message: "notes, description, project_id and completed are required" })
        } else {
            const updateAction = await Actions.update(req.params.id, { project_id, description, notes, completed })
            res.status(201).json(updateAction)
        }
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', validateActionsID, async (req, res, next) => {
    try {
        const deletedAction = await Actions.remove(req.params.id)
        res.json({ message: `you successfully deleted ${deletedAction} project` })
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'Error inside actions router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router

