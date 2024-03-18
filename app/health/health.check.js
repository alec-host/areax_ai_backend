exports.HealthCheck = async(req,res) => {
    const { word } = req.body;
    if(word){
        try{ 
            res.status(200).json({
                success: true,
                error: false,
                message: 'Server is up'
            });          
        }catch(e){
            if(e){
                res.status(500).json({
                    success: false,
                    error: true,
                    message: e?.response?.message || 'Something wrong has happened'
                });
            }           
        }
    }else{
        res.status(400).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};