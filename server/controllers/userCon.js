

export const getUser=async(req, res)=>{


    try {
        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }


}

export const updateUser=async(req, res)=>{


    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }


}


export const changePassword=async(req, res)=>{


    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }


}