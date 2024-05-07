// add middlewares here related to projects
const Projects = require("./projects-model")


async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({ message: "No project with a given ID" })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving project" })
    }
}

function validateProjectBody(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({ message: "Must provide name and description" })
    } else {
        req.name = name;
        req.description = description;
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProjectBody,
}
