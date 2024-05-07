// add middlewares here related to actions
const Actions = require("./actions-model")
const Projects = require("../projects/projects-model")


async function validateActionsID(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({ message: "No action with a given ID" })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving action" })
    }
}

function validateActionBody(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "Must provide project_id, notes and description" })
    } else {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes
        next()
    }
}

async function checkProject_id(req, res, next) {
    try {
        const { project_id } = req.body
        const projectID = await Projects.get(project_id)
        if (!projectID) {
            res.status(404).json({ message: "no action with a given project_id" })
        } else {
            req.project_id = projectID
            next()
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving action" })
    }
}

module.exports = {
    validateActionsID,
    validateActionBody,
    checkProject_id,
}