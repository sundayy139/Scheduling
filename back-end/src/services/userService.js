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
                    attributes: ['email','firstName','lastName', 'roleId', 'password'],
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }

            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

// Hash password
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var salt = await bycrypt.genSalt(10);
            var hashPassword = bycrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check email exists
            let check = await checkUserEmail(data.email);

            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create a new user successfully !"
                });
            }


        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (user) {
                user.email = data.email,
                    user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;

                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update user successfully"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

// Delete a user
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: "User not found"
            })
        } else {
            await db.User.destroy({
                where: { id: userId }
            });
            resolve({
                errCode: 0,
                errMessage: "User deleted successfully !"
            })
        }
    })
}

// Get All code
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let res = {};
                let allCode = await db.AllCode.findAll({
                    where: {
                         type: typeInput 
                    }
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}