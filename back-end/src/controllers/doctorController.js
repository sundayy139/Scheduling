import doctorService from "../services/doctorService";

let getTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let doctor = await doctorService.getTopDoctor(+limit);
        return res.status(200).json(doctor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
};

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
};


let createDetailDoctor = async (req, res) => {
    try {
        let response = await doctorService.createDetailDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let info = await doctorService.getDetailDoctor(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let createScheduleDoctor = async (req, res) => {
    try {
        let data = await doctorService.createScheduleDoctor(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getScheduleDoctor = async (req, res) => {
    try {
        let data = await doctorService.getScheduleDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getExtraInfoDoctor = async (req, res) => {
    try {
        let data = await doctorService.getExtraInfoDoctor(req.query.doctorId);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getProfileDoctor = async (req, res) => {
    try {
        let data = await doctorService.getProfileDoctor(req.query.doctorId);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}



module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctors: getAllDoctors,
    createDetailDoctor: createDetailDoctor,
    getDetailDoctor: getDetailDoctor,
    createScheduleDoctor: createScheduleDoctor,
    getScheduleDoctor: getScheduleDoctor,
    getExtraInfoDoctor: getExtraInfoDoctor,
    getProfileDoctor: getProfileDoctor,
}