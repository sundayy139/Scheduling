import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
    try {
        let data = await clinicService.createClinic(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        }

        let clinics = await clinicService.getAllClinic(req.query.id);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            clinics
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let editClinic = async (req, res) => {
    try {
        let data = req.body;
        let message = await clinicService.editClinic(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'External server error'
        })
    }
}

let deleteClinic = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        } else {
            let deleted = await clinicService.deleteClinic(req.body.id);

            return res.status(200).json({
                errCode: 0,
                errMessage: "Clinic deleted",
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

let getDetailClinic = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinic(req.query.id);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    deleteClinic: deleteClinic,
    editClinic: editClinic,
    getDetailClinic: getDetailClinic
}