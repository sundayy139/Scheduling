import userSevice from "../services/userSevice"


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).send({
            success: false,
            errCode: 1,
            message: 'Invalid email or password'
        })
    }

    let userData = await userSevice.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user :userData.user ? userData.user : {}
    });
}

let handleGetAllUsers = async (req, res) =>{
    let id = req.body.id; 

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameters",
            users: []
        })
    }
    
    let users = await userSevice.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}