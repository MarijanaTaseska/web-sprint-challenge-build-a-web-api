// add middlewares here related to actions
const Actions = require("./actions-model")


async function validateActionsID(req, res, next){
    try{   
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({message: "No action with a given ID"})
        }else{
            req.action = action
            next()
        }
    } catch(err){
        res.status(500).json({message:"Error retrieving action"})
    }
}


module.exports = {
    validateActionsID,
}