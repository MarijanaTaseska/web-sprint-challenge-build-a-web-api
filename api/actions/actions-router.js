// Write your "actions" router here!
const express = require("express")
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message:"Hello form Actions ROUTER!!!!"})
})

module.exports = router