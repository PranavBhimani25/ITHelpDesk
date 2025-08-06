import ratelimit from "../config/upstash.js"


const rateLimiter = async (req,res,next) => {
    try{
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(423).json({
                message : "Too many Request"
            })   
        }
        next()
    }
    catch(error){
        console.log("Rate Limit Error!")
 
    }

}

export default rateLimiter