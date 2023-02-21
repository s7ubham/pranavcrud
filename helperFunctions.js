class HelperFunctions{
    
    validate(req, res, next){
        for (const key in req.body){
            if (req.body[key].trim().length == 0){
                res.status(400).json({message: `${key} field is empty`}).end();
                return;
            }
        }
        next();
    }
    
}

module.exports = HelperFunctions;