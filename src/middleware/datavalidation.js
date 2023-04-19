const error = require('../helper/error')


function datavallidation(schema){

    return function(req,res,next){
        let body = req.body

        let options = {
            abortEarly : false,
            messages : error
        }

        const result = schema.validate(body,options)

        if(result.error){
            const error = result.error.details.map((k)=>{
                const msg = k.message
                return msg
            })
            return res.json({
                status : 400,
                message : "Invalid parameter",
                data : error
            })
        }
        return next()
    }

}

module.exports = datavallidation