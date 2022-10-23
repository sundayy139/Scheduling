import specialtyService from "../services/specialtyService";


let createSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        }

        let specialties = await specialtyService.getAllSpecialty(req.query.id);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            specialties
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let editSpecialty = async (req, res) => {
    try {
        let data = req.body;
        let message = await specialtyService.editSpecialty(data);
        return res.status(200).json(message)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'External server error'
        })
    }
}

let deleteSpecialty = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        } else {
            let deleted = await specialtyService.deleteSpecialty(req.body.id);

            return res.status(200).json({
                errCode: 0,
                errMessage: "Specialty deleted",
                deleted
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialty(req.query.id, req.query.location);

        return res.status(200).json({
            errCode: 0,
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    deleteSpecialty: deleteSpecialty,
    editSpecialty: editSpecialty,
    getDetailSpecialty: getDetailSpecialty
}
