exports.errorTimeOutHandler = async(err,req,res,next) => {
    if(req.timedout) {
      res.status(504).send('Request timed out');
    }else {
       next();
    }
 }; 