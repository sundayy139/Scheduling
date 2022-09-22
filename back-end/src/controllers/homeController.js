import db from "../models/index";
import CRUDServices from "../services/CRUDServices"

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getCRUD = async (req, res) => {

    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {

    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send("postCRUD");

}

let displayCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();
    return res.render("display-crud.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId); 

        if (userData) {
            return res.render("edit-crud.ejs", {
                user: userData
            });
        } else {
            return res.send(404);
        }

    } else {
        console.log("User not found")
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDServices.updateUserData(data);

    return res.render("display-crud.ejs", {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;

    if(userId) {
        await CRUDServices.deleteUserById(userId);
        return res.send("delete user successfully")
    } else {
        return res.send(404);
    }

}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}