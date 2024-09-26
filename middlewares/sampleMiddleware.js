const middle1=function(req, res, next){
    console.log("middleware 1 inbetween");
    //we can do authentication,validation ,conditional function call any thing
    //res.send("response from middleware")// req is not going to next middleware
    next(); // next middleware // request method to move on further middle wares
}

const middle2=function(req, res, next){
    console.log("middleware 2 inbetween");
    //res.send("response from middleware")// req is not going to next middleware
    next(); // next middleware // request method
}

module.exports={middle1,middle2}