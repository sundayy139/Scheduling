import handbookService from "../services/handbookService";

let createHandbook = async (req, res) => {
    try {
        let data = await handbookService.createHandbook(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllHandbook = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        }

        let handbooks = await handbookService.getAllHandbook(req.query.id);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            handbooks
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getLimitHandbook = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 5;

    try {
        if (!limit) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        }

        let handbooks = await handbookService.getLimitHandbook(+limit);

        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            handbooks
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteHandbook = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing require parameters",
            })
        } else {
            let deleted = await handbookService.deleteHandbook(req.body.id);

            return res.status(200).json({
                errCode: 0,
                errMessage: "Handbook has been deleted",
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

let editHandbook = async (req, res) => {
    try {
        let data = req.body;
        let message = await handbookService.editHandbook(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'External server error'
        })
    }
}

let getDetailHandbook = async (req, res) => {
    try {
        let data = await handbookService.getDetailHandbook(req.query.id);

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
    createHandbook,
    getAllHandbook,
    deleteHandbook,
    editHandbook,
    getDetailHandbook,
    getLimitHandbook
}