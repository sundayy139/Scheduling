import db from "../models/index";
import bycrypt from "bcryptjs";
import bcrypt from "bcryptjs/dist/bcrypt";


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {

                let user = await db.User.findOne({
                    where: {
                        email: email
                    },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true

                });

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not does not exist`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in system`;
                resolve(userData);
            }

            resolve(userData);

        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }

    })
}


module.exports = {
    handleUserLogin: handleUserLogin
}